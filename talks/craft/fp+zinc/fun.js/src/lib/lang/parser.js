/*
 * fun.js
 * https://github.com/d-plaindoux/talks_n_blog/blob/master/talks/craft/fp%2Bzinc/fun.js
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import { genlex as GLex, F as Flow } from 'parser-combinator';
import ast from './ast';

//
// Facilities
//

const tkNumber = GLex.token.parser.number,
      tkString = GLex.token.parser.string,
      tkChar = GLex.token.parser.char,
      tkIdent = GLex.token.parser.ident,
      tkKeyword = s => GLex.token.parser.keyword.match(s);

// unit -> Parser Expression Token
function atom() {
    return (tkNumber.map(ast.constant))
        .or(tkString.map(ast.constant))
        .or(tkChar.map(ast.constant))
        .or(tkIdent.map(ast.ident));
}

// unit -> Parser Expression Token
function abstraction() {
    return Flow.try(tkIdent.rep().then(tkKeyword('->').drop()))
        .then(Flow.lazy(expression))
        .map(t => {
            var term = t[1];
            t[0].array()
                .reverse()
                .forEach(a => term = ast.abstraction(a, term));
            return term;
        });
}

// unit -> Parser Expression Token
function native() {
    return tkKeyword('native').drop()
        .then(tkString)
        .then(tkNumber)
        .map(t => ast.native(t[0], t[1]));
}

// unit -> Parser Expression Token
function block() {
    return tkKeyword('(').drop()
        .then(Flow.lazy(expression))
        .then(tkKeyword(')').drop());
}

// unit -> Parser Expression Token
function simpleExpression() {
    return abstraction()
        .or(native())
        .or(atom())
        .or(block());
}

// unit -> Parser Expression Token
function expression() {
    return simpleExpression().then(simpleExpression().optrep())
        .map(t => {
            var term = t[0];
            t[1].array().forEach(a => term = ast.application(term, a));
            return term;
        });
}

// unit -> Parser Entity Token
function definition() {
    return tkKeyword('def').drop()
        .then(tkIdent)
        .then(simpleExpression())
        .map(t => ast.definition(t[0], t[1]));
}

// unit -> Parser [Entity] Token
function definitions() {
    return definition()
        .or(expression().map(ast.main))
        .optrep();
}

// Parser a' Token -> Parser a' char
function lexer(parser) {
    return GLex.genlex
            .generator(['def', 'native', '->', '(', ')'])
            .tokenBetweenSpaces(GLex.token.builder)
            .chain(parser);
}

export default {
    expression: (source) => {
        return lexer(expression()).parse(source);
    },
    entities: (source) => {
        return lexer(definitions()).thenLeft(Flow.eos).parse(source);
    }
};
