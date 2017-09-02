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
import machine from "../runtime/machine";

class Fun {

    constructor() {
        this.machine = machine;
    }

    execute(source) {
        parser.entities(stream.ofString(source))
            .toTry()
            .map(l =>
                l.array()
                 .map(toDeBruijn)
                 .map(toObjcode)
                 .map(machine.manage.bind(machine))
                 .map(console.log)
            );
    }

}

export default new Fun();
