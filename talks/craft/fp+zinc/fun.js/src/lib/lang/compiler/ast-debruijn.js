/*
 * fun.js
 * https://github.com/d-plaindoux/talks_n_blog/blob/master/talks/craft/fp%2Bzinc/.js
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

class /*abstract*/ DBExpression {
    constructor() {
        if (this.constructor.name === DBExpression.name) {
            throw new TypeError("Abstract class");
        }
    }
}

class Ident extends DBExpression {
    // String -> DBExpression
    constructor(name) {
        super();
        this.name = name;
    }

    // Visitor 'a -> 'a
    visit(visitor) {
        return visitor.ident(this);
    }
}

class Native extends DBExpression {
    // String, Number -> DBExpression
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

class Constant extends DBExpression {
    // Number|String|Char -> DBExpression
    constructor(value) {
        super();
        this.value = value;
    }

    // Visitor 'a -> 'a
    visit(visitor) {
        return visitor.constant(this);
    }
}

class Application extends DBExpression {
    // Abstraction, DBExpression -> DBExpression
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

class Abstraction extends DBExpression {
    // String, DBExpression -> DBExpression
    constructor(body) {
        super();
        this.body = body;
    }

    // Visitor 'a -> 'a
    visit(visitor) {
        return visitor.abstraction(this);
    }
}

class Variable extends DBExpression {
    // String -> DBExpression
    constructor(index) {
        super();
        this.index = index;
    }

    // Visitor 'a -> 'a
    visit(visitor) {
        return visitor.variable(this);
    }
}

// -----------------------------------------------------------------------------

class /*abstract*/ DBEntity {
    constructor() {
        if (this.constructor.name === DBEntity.name) {
            throw new TypeError("Abstract class");
        }
    }
}

class Definition extends DBEntity {
    // String -> Expression
    constructor(name, expression) {
        super();
        this.name = name;
        this.expression = expression;
    }

    // Visitor 'a -> 'a
    visit(visitor) {
        return visitor.definition(this);
    }
}

class Main extends DBEntity {
    // String -> Expression
    constructor(expression) {
        super();
        this.expression = expression;
    }

    // Visitor 'a -> 'a
    visit(visitor) {
        return visitor.main(this);
    }
}

export default {
    ident: n => new Ident(n),
    constant: c => new Constant(c),
    native: c => new Native(c),
    application: (f,a) => new Application(f,a),
    abstraction: (b) => new Abstraction(b),
    variable: n => new Variable(n),
    definition: (n,e) => new Definition(n,e),
    main: e => new Main(e)
}
