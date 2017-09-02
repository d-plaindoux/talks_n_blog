import { stream, data } from 'parser-combinator';
import parser from "../../lib/lang/analyzer/parser";
import toDeBruijn from "../../lib/lang/compiler/debruijn";
import toObjcode from "../../lib/lang/compiler/objcode";
import runtime from "../../lib/lang/runtime/machine";

import astObjcode from "../../lib/lang/compiler/ast-objcode";

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit
 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

function repl(source) {
    return parser.expression(stream.ofString(source))
        .toTry()
        .map(toDeBruijn)
        .map(toObjcode)
        .map(runtime.execute.bind(runtime)); // o_O
}

export default {
    setUp: function(done) {
        done();
    },

    'execute a constant': function(test) {
        test.expect(1);
        test.deepEqual(repl("42"),
                       data.atry.success(astObjcode.constant(42)),
                       'execute a constant.');
        test.done();
    },

    'execute an abstraction': function(test) {
        test.expect(1);
        test.deepEqual(repl("a -> a"),
                       data.atry.success([ [ astObjcode.access(1), astObjcode.returns ], [] ]),
                       'execute a constant.');
        test.done();
    },

    'execute an application': function(test) {
        test.expect(1);
        test.deepEqual(repl("(a -> a) 42"),
                       data.atry.success(astObjcode.constant(42)),
                       'execute a constant.');
        test.done();
    },

}
