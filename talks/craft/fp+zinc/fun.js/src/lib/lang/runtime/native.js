/*
 * fun.js
 * https://github.com/d-plaindoux/talks_n_blog/blob/master/talks/craft/fp%2Bzinc/.js
 *
 * Copyright (c) 2017 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

import astObjcode from '../compiler/ast-objcode';

export default {
    'add': env => {
        // Remember De Bruijn indexes
        const a = env[1].value,
              b = env[0].value;

        return astObjcode.constant(a + b);
    },
    'minus': env => {
        // Remember De Bruijn indexes
        const a = env[1].value,
              b = env[0].value;

        return astObjcode.constant(a - b);
    },
    'mult': env => {
        // Remember De Bruijn indexes
        const a = env[1].value,
              b = env[0].value;

        return astObjcode.constant(a * b);
    },
    'equal': env => {
        const a = env[1].value,
              b = env[0].value;

        return astObjcode.constant(a === b);
    },
    'cond': env => {
        // Remember De Bruijn indexes
        const c = env[2].value,
              t = env[1].value,
              f = env[0].value

        if (c.value == true) {
            return t;
        } else {
            return f;
        }
    }
}
