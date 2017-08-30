import { stream } from 'parser-combinator';
import parser from '../../lib/lang/parser';
import terms from '../../lib/lang/terms';

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

    'parse number': function(test) {
        test.expect(1);
        test.deepEqual(parser.parse(stream.ofString('42')).value,
                       terms.constant(42),
                       'should accept number.');
        test.done();
    },

    'parse string': function(test) {
        test.expect(1);
        test.deepEqual(parser.parse(stream.ofString('"42"')).value,
                       terms.constant('42'),
                       'should accept string.');
        test.done();
    },

    'parse character': function(test) {
        test.expect(1);
        test.deepEqual(parser.parse(stream.ofString("'4'")).value,
                       terms.constant('4'),
                       'should accept character.');
        test.done();
    },

    'parse ident': function(test) {
        test.expect(1);
        test.deepEqual(parser.parse(stream.ofString("anIdent")).value,
                       terms.ident('anIdent'),
                       'should accept ident.');
        test.done();
    },

    'parse identity abstraction': function(test) {
        test.expect(1);
        test.deepEqual(parser.parse(stream.ofString("{ a in a }")).value,
                       terms.abstraction('a',terms.ident('a')),
                       'should accept abstraction.');
        test.done();
    },

    'parse true abstraction': function(test) {
        test.expect(1);
        test.deepEqual(parser.parse(stream.ofString("{ a b in a }")).value,
                       terms.abstraction('a',terms.abstraction('b',terms.ident('a'))),
                       'should accept abstraction.');
        test.done();
    },

    'parse number in block': function(test) {
        test.expect(1);
        test.deepEqual(parser.parse(stream.ofString('(42)')).value,
                       terms.constant(42),
                       'should accept number.');
        test.done();
    },

    'parse string in block': function(test) {
        test.expect(1);
        test.deepEqual(parser.parse(stream.ofString('("42")')).value,
                       terms.constant('42'),
                       'should accept string.');
        test.done();
    },

    'parse character in block': function(test) {
        test.expect(1);
        test.deepEqual(parser.parse(stream.ofString("('4')")).value,
                       terms.constant('4'),
                       'should accept character.');
        test.done();
    },

    'parse ident in a block': function(test) {
        test.expect(1);
        test.deepEqual(parser.parse(stream.ofString("(anIdent)")).value,
                       terms.ident('anIdent'),
                       'should accept ident in a block.');
        test.done();
    },

    'parse identity abstraction in a block': function(test) {
        test.expect(1);
        test.deepEqual(parser.parse(stream.ofString("({ a in a })")).value,
                       terms.abstraction('a',terms.ident('a')),
                       'should accept abstraction.');
        test.done();
    },

    'parse true abstraction in a block': function(test) {
        test.expect(1);
        test.deepEqual(parser.parse(stream.ofString("({ a b in a })")).value,
                       terms.abstraction('a',terms.abstraction('b',terms.ident('a'))),
                       'should accept abstraction.');
        test.done();
    },

}
