import { stream } from 'parser-combinator';
import parser from '../../lib/lang/parser';
import terms from '../../lib/lang/terms';
import entities from '../../lib/lang/entities';

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

    'parse constant definition': function(test) {
        test.expect(1);
        test.deepEqual(parser.entities(stream.ofString('def Ultimate 42')).value.array(),
                       [ entities.definition('Ultimate',terms.constant(42)) ],
                       'should accept ultimate definition.');
        test.done();
    },

    'parse Identity definition': function(test) {
        test.expect(1);
        test.deepEqual(parser.entities(stream.ofString('def Identity x -> x')).value.array(),
                       [ entities.definition('Identity',terms.abstraction('x', terms.ident('x'))) ],
                       'should accept identity definition.');
        test.done();
    },

    'parse main definition': function(test) {
        test.expect(1);
        test.deepEqual(parser.entities(stream.ofString('(x -> x) 42')).value.array(),
                       [ entities.main(terms.application(terms.abstraction('x',terms.ident('x')),terms.constant(42))) ],
                       'should accept identity definition.');
        test.done();
    },

    'parse multiple definitions': function(test) {
        test.expect(1);
        test.deepEqual(parser.entities(stream.ofString('Identity 42 def Identity x -> x')).value.array(),
                       [ entities.main(terms.application(terms.ident('Identity'),terms.constant(42))),
                         entities.definition('Identity',terms.abstraction('x', terms.ident('x'))) ],
                       'should accept identity and an application defintions.');
        test.done();
    },
}
