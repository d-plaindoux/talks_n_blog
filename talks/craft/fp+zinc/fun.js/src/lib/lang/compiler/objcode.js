/*
 * fun.js
 * https://github.com/d-plaindoux/talks_n_blog/blob/master/talks/craft/fp%2Bzinc/.js
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import astObjcode from './ast-objcode';

class Generator {

    constructor(variables) {
        this.variables = variables;
    }

    definition(d) {
        return []; // astDB.definition(d.name, d.expression.visitor(this));
    }

    main(m) {
        return []; // astDB.main(d.expression.visitor(this));
    }

    variable(i) {
        return [ astObjcode.access(i.index) ];
    }

    constant(c) {
        return [ astObjcode.constant(c.value) ];
    }

    native(n) {
        return []; // astObjcode.native(n.name, n.arity);
    }

    application(a) {
        return a.abstraction.visit(this)
            .concat(a.argument.visit(this))
            .concat(astObjcode.apply);
    }

    abstraction(a) {
        return [ astObjcode.closure(a.body.visit(this).concat(astObjcode.returns)) ];
    }
}

export default function(e) {
    return e.visit(new Generator([]));
}
