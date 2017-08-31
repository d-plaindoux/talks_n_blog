/*
 * fun.js
 * https://github.com/d-plaindoux/talks_n_blog/blob/master/talks/craft/fp%2Bzinc/.js
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

class /*abstract*/ Entity {
    constructor() {
        if (this.constructor.name === Entity.name) {
            throw new TypeError("Abstract class");
        }
    }
}

class Definition extends Entity {
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

class Main extends Entity {
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
    definition: (n,e) => new Definition(n,e),
    main: e => new Main(e)
}
