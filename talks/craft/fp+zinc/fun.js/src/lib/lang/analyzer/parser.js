/*
 * fun.js
 * https://github.com/d-plaindoux/talks_n_blog/blob/master/talks/craft/fp%2Bzinc/fun.js
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import { genlex as GLex, F as Flow, data } from 'parser-combinator';
import ast from './ast';

import '../../extensions/array'

//
// Facilities provided by the generic lexer library
//

const tkNumber = GLex.token.parser.number,
      tkString = GLex.token.parser.string,
      tkChar = GLex.token.parser.char,
      tkIdent = GLex.token.parser.ident,
      tkKeyword = s => GLex.token.parser.keyword.match(s).drop();

// unit -> Parser Expression Token
function atom() {
    return (tkNumber.map(ast.constant))
        .or(tkString.map(ast.constant))
        .or(tkChar.map(ast.constant))
        .or(tkIdent.map(ast.ident));
}

// unit -> Parser Expression Token
function abstraction() {
    // { A B -> ... } == { A -> { B -> ... } }
    return tkKeyword('{')
        .then(tkIdent.rep().then(tkKeyword('->')).opt().map(t => t.orElse(['_'])))
        .then(Flow.lazy(expression))
        .then(tkKeyword('}'))
        .map(t => t[0].array().foldRight(ast.abstraction, t[1]));
}

// unit -> Parser Expression Token
function native() {
    return tkKeyword('native')
        .then(tkString.map(ast.native));
}

// unit -> Parser Expression Token
function blockOrUnit() {
    return tkKeyword('(')
        .then(Flow.lazy(expression).opt().map(t => t.orElse(ast.constant(data.unit))))
        .then(tkKeyword(')'));
}

function endblock() {
    return tkKeyword('$')
        .then(Flow.lazy(expression));
}

// unit -> Parser Expression Token
function simpleExpression() {
    return abstraction()
        .or(native())
        .or(atom())
        .or(blockOrUnit())
        .or(endblock());
}

// unit -> Parser Expression Token
function expression() {
    // A B ... == (A B) ...
    return simpleExpression().then(simpleExpression().optrep())
        .map(t => t[1].array().foldLeft(t[0], ast.application));
}

// unit -> Parser Entity Token
function definition() {
    return tkKeyword('def')
        .then(tkIdent)
        .then(simpleExpression())
        .map(t => ast.definition(t[0], t[1]));
}

function main() {
    return expression().map(ast.main);
}

// unit -> Parser [Entity] Token
function definitions() {
    return definition()
        .or(main())
        .optrep();
}

// Parser a' Token -> Parser a' char
function lexer(parser) {
    return GLex.genlex
            .generator(['def', 'native', '->', '(', ')', '$', '{', '}'])
            .tokenBetweenSpaces(GLex.token.builder)
            .chain(parser);
}

export default {
    expression: (source) => {
        return lexer(expression()).then(Flow.eos.drop()).parse(source);
    },
    entities: (source) => {
        return lexer(definitions()).then(Flow.eos.drop()).parse(source);
    }
};
