/*
 * fun.js
 * https://github.com/d-plaindoux/talks_n_blog/blob/master/talks/craft/fp%2Bzinc/.js
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import astDB from './ast-debruijn';

class Transformer {

    constructor() {
        this.variables = [];
    }

    definition(d) {
        return astDB.definition(d.name, d.expression.visitor(this));
    }

    main(m) {
        return astDB.main(d.expression.visitor(this));
    }

    ident(i) {
        const index = this.variables.indexOf(i.name);

        if (index ==  -1) {
            return astDB.ident(i.name);
        }

        return astDB.variable(index);
    }

    constant(c) {
        return astDB.constant(c.value);
    }

    native(n) {
        return astDB.native(n.name, n.arity);
    }

    application(a) {
        return astDB.abstraction(a.abstraction.visit(this), a.argument.visit(this));
    }

    abstraction(a) {
        const newVariables = [a.name].concat(this.variables),
              newTransformer = new Transformer(newVariables);

        return astDB.abstraction(a.abstraction.visit(this), a.argument.visit(newTransformer));
    }
}

export default {
    toDeBruijn: e => e.visit(new Transformer())
}
