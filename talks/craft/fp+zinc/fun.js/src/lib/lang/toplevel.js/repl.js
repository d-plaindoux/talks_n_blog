/*
 * fun.js
 * https://github.com/d-plaindoux/talks_n_blog/blob/master/talks/craft/fp%2Bzinc/.js
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import parser from "../analyzer/parser";
import toDeBruijn from "../compiler/debruijn";
import toObjcode from "../compiler/objcode";
import runtime from "../runtime/machine";

const source = "(a -> a) 1"

const valueOrError =
    parser.expression(source)
    .map(toDeBruijn)
    .map(toObjcode)
    .map(runtime.execute); // Code should always be correct !

console.log(valueOrError);
