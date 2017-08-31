/*
 * fun.js
 * https://github.com/d-plaindoux/talks_n_blog/blob/master/talks/craft/fp%2Bzinc/.js
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

class /*abstract*/ Expression {
    constructor() {
        if (this.constructor.name === Expression.name) {
            throw new TypeError("Abstract class");
        }
    }
}

class Ident extends Expression {
    // String -> Expression
    constructor(name) {
        super();
        this.name = name;
    }

    // Visitor 'a -> 'a
    visit(visitor) {
        return visitor.ident(this);
    }
}

class Native extends Expression {
    // String, Number -> Expression
    constructor(name, arity) {
        super();
        this.name = name;
        this.arity = arity
    }

    // Visitor 'a -> 'a
    visit(visitor) {
        return visitor.ident(this);
    }
}

class Constant extends Expression {
    // Number|String|Char -> Expression
    constructor(value) {
        super();
        this.value = value;
    }

    // Visitor 'a -> 'a
    visit(visitor) {
        return visitor.constant(this);
    }
}

class Application extends Expression {
    // Abstraction, Expression -> Expression
    constructor(abstraction, argument) {
        super();
        this.abstraction = abstraction;
        this.argument = argument;
    }

    // Visitor 'a -> 'a
    visit(visitor) {
        return visitor.application(this);
    }
}

class Abstraction extends Expression {
    // String, Expression -> Expression
    constructor(variable, body) {
        super();
        this.variable = variable;
        this.body = body;
    }

    // Visitor 'a -> 'a
    visit(visitor) {
        return visitor.abstraction(this);
    }
}

export default {
    ident: n => new Ident(n),
    constant: c => new Constant(c),
    native: c => new Native(c),
    application: (f,a) => new Application(f,a),
    abstraction: (v,b) => new Abstraction(v,b)
}
