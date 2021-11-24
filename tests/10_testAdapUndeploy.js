let testCase = require('nodeunit').testCase;
const Signal = require('../src/Signal');
const SignalComp = require('../src/SignalComp');
const EMA = require('../src/EMA');

module.exports = testCase({
    'setUp': function (test) {
        EMA.init();
        test();
    },
    'layer-undeploy-1': function (test) {
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
        EMA.undeploy(adap);
        flags.push(obj.m());
        test.deepEqual(flags, ["original", "variation", "original"]);

        test.done();
    },
    'layer-undeploy-deploy': function (test) {
        let flags = [];
        let obj = {
            x: new Signal(-1),
            m: function () {
                return "original";
            },
        };

        let adap = {
            condition: "a > 1",
        };

        obj.x.value = 10;
        EMA.exhibit(obj, {a: obj.x});
        EMA.addPartialMethod(adap, obj, "m", function () {
            return "variation";
        });
        flags.push(obj.m());
        EMA.deploy(adap);
        flags.push(obj.m());
        EMA.undeploy(adap);
        flags.push(obj.m());
        EMA.deploy(adap);
        flags.push(obj.m());

        test.deepEqual(flags, ["original", "variation", "original", "variation"]);

        test.done();
    }
});