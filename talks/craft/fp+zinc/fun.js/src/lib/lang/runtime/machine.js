/*
 * fun.js
 * https://github.com/d-plaindoux/talks_n_blog/blob/master/talks/craft/fp%2Bzinc/.js
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

class Machine {

    constructor() {
        this.heap = {};
        this.init([]);
    }

    define(name, code) {
        this.heap[name] = code;
    }

    init(code) {
        this.code = code;
        this.env = [];
        this.stack = [];
    }

    execute(code) {
        this.init(code)

        while (this.code.length > 0) {
            this.code.shift().visit(this);
        }

        return this.stack.shift();
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
}

export default new Machine();
