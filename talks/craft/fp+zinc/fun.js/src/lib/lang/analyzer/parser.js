/*
 * fun.js
 * https://github.com/d-plaindoux/talks_n_blog/blob/master/talks/craft/fp%2Bzinc/fun.js
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import { genlex as GLex, F as Flow } from 'parser-combinator';
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
    // A B -> ... == A -> (B -> ...)
    return Flow.try(tkIdent.rep().then(tkKeyword('->')))
        .then(Flow.lazy(expression))
        .map(t => t[0].array().foldRight(ast.abstraction, t[1]));
}

// unit -> Parser Expression Token
function native() {
    return tkKeyword('native')
        .then(tkString)
        .then(tkNumber)
        .map(t => ast.native(t[0], t[1]));
}

// unit -> Parser Expression Token
function block() {
    return tkKeyword('(')
        .then(Flow.lazy(expression))
        .then(tkKeyword(')'));
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
        return lexer(expression()).then(Flow.eos.drop()).parse(source);
    },
    entities: (source) => {
        return lexer(definitions()).then(Flow.eos.drop()).parse(source);
    }
};
