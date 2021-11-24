let testCase = require('nodeunit').testCase;
const Signal = require('../src/Signal');
const SignalComp = require('../src/SignalComp');
const Layer = require('../src/Layer');
const EMA = require('../src/EMA');

module.exports = testCase({
    'setUp': function (test) {
        EMA.init();
        test();
    },
    'create': function (test) {
        let flags = [];
        let obj = {
            x: new Signal(9),
            m: function () {
                flags.push("original")
            },
        };

        let adap = {
            condition: "a > 1"
        };

        EMA.exhibit(obj, {a: obj.x});
        EMA.addPartialMethod(adap, obj, "m", function () {
            flags.push("variation")
        });
        EMA.deploy(adap);
        obj.m();
        test.deepEqual(flags, ["variation"]);

        test.done();
    },
    'create-2': function (test) {
        let flags = [];
        let obj = {
            x: new Signal(9),
            m: function () {
                flags.push("original")
            },
        };

        let adap = {
            condition: new SignalComp("a > 1")
        };

        EMA.exhibit(obj, {a: obj.x});
        EMA.addPartialMethod(adap, obj, "m", function () {
            flags.push("variation");
        });
        obj.m();

        EMA.deploy(adap); //later deployment
        test.deepEqual(flags, ["original"]);

        test.done();
    },
    'variation-1': function (test) {
        let flags = [];
        let obj = {
            x: new Signal(-1),
            m: function () {
                flags.push("original");
            },
        };

        let adap = {
            condition: new SignalComp("a > 1")
        };

        EMA.exhibit(obj, {a: obj.x});
        EMA.addPartialMethod(adap, obj, "m", function () {
            flags.push("variation");
        });
        EMA.deploy(adap);
        obj.x.value = 10;
        obj.m();
        test.deepEqual(flags, ["variation"]);

        test.done();
    },
    'variation-2-changing-deployment-place': function (test) {
        let flags = [];
        let obj = {
            x: new Signal(-1),
            m: function () {
                flags.push("original");
            },
        };

        let adap = {
            condition: new SignalComp("a > 1")
        };

        obj.x.value = 10;
        EMA.exhibit(obj, {a: obj.x});
        EMA.addPartialMethod(adap, obj, "m", function () {
            flags.push("variation");
        });
        EMA.deploy(adap);
        obj.m();
        test.deepEqual(flags, ["variation"]);

        test.done();
    },
    'variation-3-changing-deployment-place': function (test) {
        let flags = [];
        let obj = {
            x: new Signal(-1),
            m: function () {
                flags.push("original");
            },
        };

        let adap = {
            condition: new SignalComp("a > 1")
        };

        obj.x.value = 10;
        EMA.exhibit(obj, {a: obj.x});
        EMA.addPartialMethod(adap, obj, "m", function () {
            flags.push("variation");
        });
        obj.m();
        EMA.deploy(adap);
        test.deepEqual(flags, ["original"]);

        test.done();
    },
    'variation-4-addingRemovingLayer': function (test) {
        let flags = [];
        let obj = {
            x: new Signal(-1),
            m: function () {
                flags.push("original")
            },
        };

        let adap = {
            condition: new SignalComp("a > 1")
        };

        obj.x.value = 10;
        EMA.exhibit(obj, {a: obj.x});
        EMA.addPartialMethod(adap, obj, "m", function () {
            flags.push("variation")
        });
        EMA.deploy(adap);

        obj.m();
        obj.x.value = 0;
        obj.m();

        test.deepEqual(flags, ["variation", "original"]);

        test.done();
    },
    'calling proceed': function (test) {
        let flags = [];
        let obj = {
            x: new Signal(-1),
            m: function () {
                flags.push("original")
            },
        };

        let adap = {
            condition: new SignalComp("a > 1")
        };

        obj.x.value = 10;
        EMA.exhibit(obj, {a: obj.x});
        EMA.addPartialMethod(adap, obj, "m", function () {
            flags.push("variation");
            Layer.proceed();
        });
        EMA.deploy(adap);
        obj.m();
        test.deepEqual(flags, ["variation", "original"]);

        test.done();
    },
    'layer-method-with-return': function (test) {
        let flags = [];
        let obj = {
            x: new Signal(-1),
            m: function () {
                return "original";
            },
        };

        let adap = {
            condition: new SignalComp("a > 1")
        };

        obj.x.value = 10;
        EMA.exhibit(obj, {a: obj.x});
        EMA.addPartialMethod(adap, obj, "m", function () {
            return "variation";
        });
        flags.push(obj.m());
        EMA.deploy(adap);
        flags.push(obj.m());
        test.deepEqual(flags, ["original", "variation"]);

        test.done();
    },
    'layer-method-with-return-proceed': function (test) {
        let flags = [];
        let obj = {
            x: new Signal(-1),
            m: function () {
                return "original";
            },
        };

        let adap = {
            condition: new SignalComp("a > 1")
        };

        obj.x.value = 10;
        EMA.exhibit(obj, {a: obj.x});
        EMA.addPartialMethod(adap, obj, "m", function () {
            return "variation" + "-" + Layer.proceed();
        });
        flags.push(obj.m());
        EMA.deploy(adap);
        flags.push(obj.m());
        test.deepEqual(flags, ["original", "variation-original"]);

        test.done();
    },
    'layer-method-with-return-proceed-uninstall': function (test) {
        let flags = [];
        let obj = {
            x: new Signal(-1),
            m: function () {
                return "original";
            },
        };

        let adap = {
            condition: new SignalComp("a > 1")
        };

        obj.x.value = 10;
        EMA.exhibit(obj, {a: obj.x});
        EMA.addPartialMethod(adap, obj, "m", function () {
            return "variation" + "-" + Layer.proceed();
        });
        flags.push(obj.m());
        EMA.deploy(adap);
        flags.push(obj.m());
        obj.x.value = 0;
        flags.push(obj.m());
        test.deepEqual(flags, ["original", "variation-original", "original"]);

        test.done();
    },
    'layer-method-with-args_1': function (test) {
        let flags = [];
        let obj = {
            x: new Signal(-1),
            m: function (x) {
                flags.push("original_" + x);
            },
        };

        let layer = {
            condition: new SignalComp("a > 1")
        };

        obj.x.value = 10;
        EMA.exhibit(obj, {a: obj.x});
        EMA.addPartialMethod(layer, obj, "m", function () {
            let arg = arguments[0];
            flags.push("variation_" + arg);
        });

        obj.m(1);
        EMA.deploy(layer);
        obj.m(2);
        obj.x.value = 0;
        obj.m(3);
        test.deepEqual(flags, ["original_1", "variation_2", "original_3"]);

        test.done();
    },
    'layer-method-with-args_proceed': function (test) {
        let flags = [];
        let obj = {
            x: new Signal(-1),
            m: function (x) {
                flags.push("original_" + x);
            },
        };

        let layer = {
            condition: new SignalComp("a > 1")
        };

        obj.x.value = 10;
        EMA.exhibit(obj, {a: obj.x});
        EMA.addPartialMethod(layer, obj, "m", function () {
            let arg = arguments[0];
            flags.push("variation_" + arg);
            Layer.proceed(arg + 1);
        });

        obj.m(1);
        EMA.deploy(layer);
        obj.m(2);
        obj.x.value = 0;
        obj.m(3);
        test.deepEqual(flags, ["original_1", "variation_2", "original_3", "original_3"]);

        test.done();
    }
});