import astObjcode from '../../lib/lang/compiler/ast-objcode';
import astEval from '../../lib/lang/runtime/ast-eval';
import engineFactory from '../../lib/lang/toplevel/evaluator'

function destruct(r) {
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
        test.deepEqual(destruct(engine.apply('do 42')),
                       [ astEval.constant(42) ],
                       'execute a constant.');
        test.done();
    },

    'execute an abstraction': function(test) {
        test.expect(1);
        const engine = engineFactory();
        test.deepEqual(destruct(engine.apply('do a -> a')),
                       [ astEval.closure([astObjcode.access(1), astObjcode.returns ], []) ],
                       'execute a constant.');
        test.done();
    },

    'execute a definition': function(test) {
        test.expect(1);
        const engine = engineFactory();
        test.deepEqual(destruct(engine.apply('def ID a -> a')),
                       [ astEval.closure([ astObjcode.access(1), astObjcode.returns ], []) ],
                       'execute a definition.');
        test.done();
    },

    'execute a wrong code': function(test) {
        test.expect(1);
        const engine = engineFactory();
        try {
            destruct(engine.apply('do 1 2'));
            test.deepEqual(true,false);
        } catch (e) {
            test.deepEqual(true,true);
        }
        test.done();
    },

    'execute an applied definition': function(test) {
        test.expect(1);
        const engine = engineFactory();
        engine.apply('def ID a -> a');
        test.deepEqual(destruct(engine.apply('do ID 42')),
                       [ astEval.constant(42) ],
                       'execute an applied definition.');
        test.done();
    },

    'execute an applied native definition': function(test) {
        test.expect(1);
        const engine = engineFactory();
        engine.apply('def add native "add" 2');
        test.deepEqual(destruct(engine.apply('do add 41 1')),
                       [ astEval.constant(42) ],
                       'execute an applied definition.');
        test.done();
    },

}
