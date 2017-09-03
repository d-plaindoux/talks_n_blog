/*
 * fun.js
 * https://github.com/d-plaindoux/talks_n_blog/blob/master/talks/craft/fp%2Bzinc/.js
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import { stream } from 'parser-combinator';
import parser from "../analyzer/parser";
import toDeBruijn from "../compiler/debruijn";
import toObjcode from "../compiler/objcode";
import machineFactory from "../runtime/machine";

class Eval {

    constructor() {
        this.machine = machineFactory();
    }

    // :: String -> Try [Objcode]
    apply(source) {
        return parser.entities(stream.ofString(source))                         // Response (List Entity)
            .toTry()                                                            // Try (List Entity)
            .map(l => l.array())                                                // Try [Entity]
            .map(a => a.map(toDeBruijn))                                        // Try [DBEntity]
            .map(a => a.map(toObjcode))                                         // Try [EntityObjcode]
            .map(a => a.map(this.machine.eval.bind(this.machine)));             // Try [Try EvaluatedCode]
    }

}

// Factory :: unit -> Eval
export default () => new Eval();
