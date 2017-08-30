/*
 * fun.js
 * https://github.com/d-plaindoux/talks_n_blog/blob/master/talks/craft/fp%2Bzinc/fun.js
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

 import { genlex as GLex, F as Flow } from 'parser-combinator';
 import terms from './terms';

//
// Facilities
//

const tkNumber = GLex.token.parser.number,
      tkString = GLex.token.parser.string,
      tkChar = GLex.token.parser.char,
      tkIdent = GLex.token.parser.ident,
      tkKeyword = s => GLex.token.parser.keyword.match(s);

function atom() {
    return (tkNumber.map(terms.constant))
        .or(tkString.map(terms.constant))
        .or(tkChar.map(terms.constant))
        .or(tkIdent.map(terms.ident));
}

function abstraction() {
    return tkKeyword('{').drop()
        .then(tkIdent.rep())
        .then(tkKeyword('in').drop())
        .then(Flow.lazy(expression))
        .then(tkKeyword('}').drop())
        .map(t => {
            var term = t[1];
            t[0].array()
                .reverse()
                .forEach(a => term = terms.abstraction(a, term));
            return term;
        });
}

function block() {
    return tkKeyword('(').drop()
        .then(Flow.lazy(expression))
        .then(tkKeyword(')').drop());
}

// unit -> Parser ? Token
function simpleExpression() {
    return atom().or(block()).or(abstraction());
}

// unit -> Parser ? Token
function expression() {
    return simpleExpression().then(Flow.lazy(expression).opt())
        .map(t => t[1].map(a => terms.application(t[0], a)).orElse(t[0]));
}

//const parse =
export default {
    parse: function(source) {
        var keywords = ['in', '(', ')', '{', '}'],
            tokenizer = GLex.genlex
                .generator(keywords)
                .tokenBetweenSpaces(GLex.token.builder);

        return tokenizer.chain(expression().thenLeft(Flow.eos)).parse(source, 0);
    },
};
