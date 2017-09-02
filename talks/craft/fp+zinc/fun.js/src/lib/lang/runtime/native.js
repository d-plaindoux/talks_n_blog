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
    }
}
