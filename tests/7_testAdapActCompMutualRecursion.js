let testCase = require('nodeunit').testCase;
const Signal = require('../src/Signal');
const SignalComp = require('../src/SignalComp');
const EMA = require('../src/EMA');

module.exports = testCase({
    'setUp': function (test) {
        EMA.init();
        test();
    },
    'mutual-recursion-1': function (test) {
        let flags = [];
        let x = new Signal(0);
        let adap1 = {
            condition: new SignalComp("a > 5"), enter: function () {
                flags.push("adap1")
            }
        };
        let adap2 = {
            condition: new SignalComp("a < 10"), enter: function () {
                flags.push("adap2")
            }
        };

        EMA.exhibit([adap1, adap2], {a: x});
        EMA.deploy(adap1);
        EMA.deploy(adap2);
        x.value = 9;
        test.deepEqual(flags, ["adap2", "adap1"]);

        test.done();
    },
    'mutual-recursion-2': function (test) {
        let flags = [];
        let x = new Signal(0);
        let adap1 = {
            condition: new SignalComp("a > 5"), enter: function () {
                flags.push("adap1");
            }
        };
        let adap2 = {
            condition: new SignalComp("a < 10 && r"), enter: function () {
                flags.push("adap2");
            }
        };

        EMA.exhibit([], {a: x});
        EMA.exhibit(adap1, {r: adap1.condition});
        EMA.exhibit(adap2, {h: adap2.condition});

        EMA.deploy(adap1);
        EMA.deploy(adap2);
        x.value = 9;
        test.deepEqual(flags, ["adap1", "adap2"]);

        test.done();
    }
});