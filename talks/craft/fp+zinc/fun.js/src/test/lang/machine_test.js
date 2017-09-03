import astObjcode from '../../lib/lang/compiler/ast-objcode';
import engineFactory from '../../lib/lang/toplevel/eval'

function denormalize(r) {
    return r.onFailure(e => { throw e; })
            .success().map(a => a.onFailure(e => { throw e; })
                                 .success());
}

export default {
    setUp: function(done) {
        done();
    },

    'execute a constant': function(test) {
        test.expect(1);
        const engine = engineFactory();
        test.deepEqual(denormalize(engine.eval('do 42')),
                       [ astObjcode.constant(42) ],
                       'execute a constant.');
        test.done();
    },

    'execute an abstraction': function(test) {
        test.expect(1);
        const engine = engineFactory();
        test.deepEqual(denormalize(engine.eval('do a -> a')),
                       [ [[ astObjcode.access(1), astObjcode.returns ], []] ],
                       'execute a constant.');
        test.done();
    },

    'execute a definition': function(test) {
        test.expect(1);
        const engine = engineFactory();
        test.deepEqual(denormalize(engine.eval('def ID a -> a')),
                       [ [[ astObjcode.access(1), astObjcode.returns ], []] ],
                       'execute a definition.');
        test.done();
    },

    'execute an applied definition': function(test) {
        test.expect(1);
        const engine = engineFactory();
        engine.eval('def ID a -> a');
        test.deepEqual(denormalize(engine.eval('do ID 42')),
                       [ astObjcode.constant(42) ],
                       'execute an applied definition.');
        test.done();
    },

    'execute an applied native definition': function(test) {
        test.expect(1);
        const engine = engineFactory();
        engine.eval('def add native "add" 2');
        test.deepEqual(denormalize(engine.eval('do add 41 1')),
                       [ astObjcode.constant(42) ],
                       'execute an applied definition.');
        test.done();
    },

}
