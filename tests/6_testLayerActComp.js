let testCase = require('nodeunit').testCase;
const Signal = require('../src/Signal');
const SignalComp = require('../src/SignalComp');
const EMA = require('../src/EMA');

module.exports = testCase({
    'setUp': function (test) {
        EMA.init();
        test();
    },
    'two-activations': function (test) {
        let obj = {
            x: new Signal(9),
            y: 56,
        };

        let adap1 = {
            condition: new SignalComp("a > 1")
        };

        let adap2 = {
            condition: new SignalComp("h")
        };

        EMA.deploy(adap1);
        EMA.deploy(adap2);
        EMA.exhibit(obj,{a: obj.x});
        EMA.exhibit(adap1,{pp: adap1.condition});

        test.ok("creating and deploying adaptations");

        test.done();
    },
    'two-activations-2': function (test) {
        let flags = [];
        let obj = {
            x: new Signal(0),
            y: 56,
        };

        let adap1 = {
            condition: new SignalComp("a > 1"),
            enter: function() {
                flags.push("enter-adap1");
            }
        };

        let adap2 = {
            condition: new SignalComp("h"),
            enter: function() {
                flags.push("enter-adap2");
            }
        };

        EMA.deploy(adap1);
        EMA.deploy(adap2);
        EMA.exhibit(obj,{a: obj.x});
        EMA.exhibit(adap1,{h: adap1.condition});
        obj.x.value = 10;
        test.deepEqual(flags, ["enter-adap1","enter-adap2"]);

        test.done();
    },
    'two-activations-3': function (test) {
        let flags = [];
        let obj = {
            x: new Signal(0),
            y: new Signal(5),
        };

        let adap1 = {
            condition: new SignalComp("a > 1"),
            enter: function() {
                flags.push("enter-adap1");
            }
        };

        let adap2 = {
            condition: new SignalComp("b > 5"),
            enter: function() {
                flags.push("enter-adap2");
            }
        };

        let adap3 = {
            condition: new SignalComp("h && r"),
            enter: function() {
                flags.push("enter-adap3");
            }
        };

        EMA.deploy(adap1);
        EMA.deploy(adap2);
        EMA.deploy(adap3);

        EMA.exhibit(obj,{a: obj.x, b: obj.y});
        EMA.exhibit(adap1,{h: adap1.condition});
        EMA.exhibit(adap2,{r: adap2.condition});
        obj.x.value = 10;
        obj.y.value = 100;
        test.deepEqual(flags, ["enter-adap1","enter-adap2","enter-adap3"]);

        test.done();
    },
    'two-activations-4': function (test) {
        let flags = [];
        let obj = {
            x: new Signal(0),
            y: new Signal(5),
        };

        let adap1 = {
            condition: new SignalComp("a > 1"),
            enter: function() {
                flags.push("enter-adap1");
            },
            exit: function () {
                flags.push("exit-adap1");
            }
        };

        let adap2 = {
            condition: new SignalComp("b > 5"),
            enter: function() {
                flags.push("enter-adap2");
            },
            exit: function () {
                flags.push("exit-adap2");
            }
        };

        let adap3 = {
            condition: new SignalComp("h && r"),
            enter: function() {
                flags.push("enter-adap3");
            },
            exit: function () {
                flags.push("exit-adap3");
            }
        };

        EMA.deploy(adap1);
        EMA.deploy(adap2);
        EMA.deploy(adap3);

        EMA.exhibit(obj,{a: obj.x, b: obj.y});
        EMA.exhibit(adap1,{h: adap1.condition});
        EMA.exhibit(adap2,{r: adap2.condition});
        obj.x.value = 10;
        obj.y.value = 100;
        obj.x.value = -1;
        test.deepEqual(flags, ["enter-adap1","enter-adap2","enter-adap3","exit-adap1","exit-adap3"]);

        test.done();
    },
    'two-activations-5': function (test) {
        let flags = [];
        let obj = {
            x: new Signal(0),
            y: new Signal(5),
        };

        let adap1 = {
            condition: new SignalComp("a > 1"),
            enter: function() {
                flags.push("enter-adap1");
            },
            exit: function () {
                flags.push("exit-adap1");
            }
        };

        let adap2 = {
            condition: new SignalComp("b > 5"),
            enter: function() {
                flags.push("enter-adap2");
            },
            exit: function () {
                flags.push("exit-adap2");
            }
        };

        let adap3 = {
            condition: new SignalComp("h && r"),
            enter: function() {
                flags.push("enter-adap3");
            },
            exit: function () {
                flags.push("exit-adap3");
            }
        };

        EMA.exhibit(obj,{a: obj.x, b: obj.y});
        EMA.exhibit(adap1,{h: adap1.condition});
        EMA.exhibit(adap2,{r: adap2.condition});
        EMA.deploy(adap1);
        EMA.deploy(adap2);
        EMA.deploy(adap3);

        obj.x.value = 10;
        obj.y.value = 100;
        obj.x.value = -1;
        test.deepEqual(flags, ["enter-adap1","enter-adap2","enter-adap3","exit-adap1","exit-adap3"]);

        test.done();
    },
    'two-activations-conflicts': function (test) {
        let flags = [];
        let obj = {
            x: new Signal(0),
            y: new Signal(0),
            z: new Signal(0)
        };

        let adap1 = {
            condition: new SignalComp("a > 1 && b > 10 && !adap2"),
            enter: function() {
                flags.push("enter-adap1");
            },
            exit: function () {
                flags.push("exit-adap1");
            }
        };

        let adap2 = {
            condition: new SignalComp("c > 5"),
            enter: function() {
                flags.push("enter-adap2");
            },
            exit: function () {
                flags.push("exit-adap2");
            }
        };

        EMA.exhibit(obj,{a: obj.x, b: obj.y, c: obj.z});
        EMA.exhibit(adap2,{adap2: adap2.condition});
        EMA.deploy(adap1);
        EMA.deploy(adap2);

        obj.x.value = 10;
        obj.y.value = 100;
        obj.z.value = 10;
        test.deepEqual(flags, ["enter-adap1","exit-adap1","enter-adap2"]);

        test.done();
    }
});