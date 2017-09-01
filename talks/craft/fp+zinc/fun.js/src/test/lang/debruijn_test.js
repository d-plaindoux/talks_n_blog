import ast from '../../lib/lang/ast';
import astDB from '../../lib/lang/ast-debruijn';
import toDeBruijn from '../../lib/lang/debruijn.js'

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

export default {
    setUp: function(done) {
        done();
    },

    'transform a constant': function(test) {
        test.expect(1);
        test.deepEqual(toDeBruijn(ast.constant(42)),
                       astDB.constant(42),
                       'Transform a constant.');
        test.done();
    },

    'transform a free variable': function(test) {
        test.expect(1);
        test.deepEqual(toDeBruijn(ast.ident('x')),
                       astDB.ident('x'),
                       'Transform a free variable.');
        test.done();
    },

    'transform the identity': function(test) {
        test.expect(1);
        test.deepEqual(toDeBruijn(ast.abstraction('x',ast.ident('x'))),
                       astDB.abstraction(astDB.variable(1)),
                       'Transform the identity.');
        test.done();
    },

    'transform true function (Also Called K)': function(test) {
        test.expect(1);
        test.deepEqual(toDeBruijn(ast.abstraction('x',ast.abstraction('y', ast.ident('x')))),
                       astDB.abstraction(astDB.abstraction(astDB.variable(2))),
                       'Transform true function (Also Called K).');
        test.done();
    },

    'transform false function': function(test) {
        test.expect(1);
        test.deepEqual(toDeBruijn(ast.abstraction('x',ast.abstraction('y', ast.ident('y')))),
                       astDB.abstraction(astDB.abstraction(astDB.variable(1))),
                       'Transform false function.');
        test.done();
    },

    'transform function with hidden variable': function(test) {
        test.expect(1);
        test.deepEqual(toDeBruijn(ast.abstraction('x',ast.abstraction('x', ast.ident('x')))),
                       astDB.abstraction(astDB.abstraction(astDB.variable(1))),
                       'Transform function with hidden variable.');
        test.done();
    },
}
