/*
 * fun.js
 * https://github.com/d-plaindoux/talks_n_blog/blob/master/talks/craft/fp%2Bzinc/.js
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

class /*abstract*/ EvaluatedCode {
    constructor() {
        if (this.constructor.name === EvaluatedCode.name) {
            throw new TypeError("Abstract class");
        }
    }
}

class Constant extends EvaluatedCode {

    // Number|String|Char|unit -> EvaluatedCode
    constructor(value) {
        super();
        this.value = value;
    }

    // Visitor 'a -> 'a
    visit(visitor) {
        return visitor.constant(this);
    }

}

class Closure extends EvaluatedCode {

    constructor(code, env) {
        super();
        this.code = code;
        this.env = env;
    }

    visit(visitor) {
        return visitor.closure(this);
    }

}

export default {
    closure: (c,e) => new Closure(c,e),
    constant: (v) => new Constant(v)
}
