import { stream, data } from 'parser-combinator';
import parser from '../../lib/lang/analyzer/parser';
import toDeBruijn from '../../lib/lang/compiler/debruijn';
import toObjcode from '../../lib/lang/compiler/objcode';
import machine from '../../lib/lang/runtime/machine';

import astObjcode from '../../lib/lang/compiler/ast-objcode';

function repl(source) {
    return parser.entities(stream.ofString(source))
        .toTry()
        .map(l =>
            l.array()
             .map(toDeBruijn)
             .map(toObjcode)
             .map(machine.manage.bind(machine))  // o_O
        );
}

export default {
    setUp: function(done) {
        done();
    },

    'execute a constant': function(test) {
        test.expect(1);
        test.deepEqual(repl('42'),
                       data.atry.success([ astObjcode.constant(42) ]),
                       'execute a constant.');
        test.done();
    },

    'execute an abstraction': function(test) {
        test.expect(1);
        test.deepEqual(repl('a -> a'),
                       data.atry.success([ [[ astObjcode.access(1), astObjcode.returns ], []] ]),
                       'execute a constant.');
        test.done();
    },

    'execute a definition': function(test) {
        test.expect(1);
        test.deepEqual(repl('def ID a -> a'),
                       data.atry.success([ [[ astObjcode.access(1), astObjcode.returns ], []] ]),
                       'execute a definition.');
        test.done();
    },

    'execute an applied definition': function(test) {
        test.expect(1);
        repl('def ID (a -> a)');
        test.deepEqual(repl('ID 42'),
                       data.atry.success([ astObjcode.constant(42) ]),
                       'execute an applied definition.');
        test.done();
    },

    'execute an applied native definition': function(test) {
        test.expect(1);
        repl('def add native "add" 2');
        test.deepEqual(repl('add 41 1'),
                       data.atry.success([ astObjcode.constant(42) ]),
                       'execute an applied definition.');
        test.done();
    },

}
