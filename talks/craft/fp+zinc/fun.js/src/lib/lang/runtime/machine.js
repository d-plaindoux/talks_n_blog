/*
 * fun.js
 * https://github.com/d-plaindoux/talks_n_blog/blob/master/talks/craft/fp%2Bzinc/.js
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import { data } from 'parser-combinator';
import native from "./native";

class Machine {

    constructor() {
        this.definitions = {};
        this.init([]);
    }

    init(code) {
        this.code = code;
        this.env = [];
        this.stack = [];
    }

    execute(code) {
        this.init(code)

        while (this.code.length > 0) {
            try {
                this.code.shift().visit(this);
            } catch (e) {
                return data.atry.failure(e);
            }
        }

        return data.atry.success(this.stack.shift());
    }

    access(i) {
        this.stack.unshift(this.env[i.index-1]);
    }

    closure(i) {
        this.stack.unshift([i.instructions, this.env.slice()]);
    }

    apply() {
        const v = this.stack.shift(),
              c = this.stack.shift();

        this.stack.unshift(this.env);
        this.stack.unshift(this.code);

        this.code = c[0].slice();
        this.env = c[1].slice();

        this.env.unshift(v);
    }

    returns() {
        const v = this.stack.shift(),
              c = this.stack.shift(),
              e = this.stack.shift();

        this.code = c.slice();
        this.env = e.slice();

        this.stack.unshift(v);
    }

    constant(m) {
        this.stack.unshift(m);
    }

    ident(i) {
        this.stack.unshift(this.definitions[i.name]);
    }

    native(n) {
        this.stack.unshift(native[n.name](this.env.slice()));
    }

    //
    // Entities
    //

    definition(d) {
        return this.execute(d.code).onSuccess(r => this.definitions[d.name] = r);
    }

    main(m) {
        return this.execute(m.code);
    }

    //
    // Main entry for entities management
    //

    eval(e) {
        return e.visit(this);
    }
}


// Factory :: unit -> Machine
export default () => new Machine();
