let testCase = require('nodeunit').testCase;
const Signal = require('../src/Signal');
const SignalComp = require('../src/SignalComp');
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
                flags.push("original_1")
            },
        };


        let adap = {
            condition: "a > 1"
        };

        EMA.exhibit(obj, {a: obj.x});
        EMA.addPartialMethod(adap, [obj], "m", function () {
            flags.push("variation")
        });
        EMA.deploy(adap);
        obj.m();
        test.deepEqual(flags, ["variation"]);

        test.done();
    },
    'create-2': function (test) {
        let flags = [];
        let obj1 = {
            x: new Signal(9),
            m: function () {
                flags.push("original_1")
            },
        };

        let obj2 = {
            m: function () {
                flags.push("original_2")
            },
        };

        let adap = {
            condition: new SignalComp("a > 1")
        };

        EMA.exhibit(obj1, {a: obj1.x});
        EMA.addPartialMethod(adap, [obj1,obj2], "m", function () {
            flags.push("variation");
        });
        obj1.m();

        EMA.deploy(adap); //later deployment
        test.deepEqual(flags, ["original_1"]);

        test.done();
    },
    'create-3': function (test) {
        let flags = [];
        let obj1 = {
            name: "1",
            x: new Signal(9),
            m: function () {
                flags.push("original_"+this.name);
            },
        };

        let obj2 = {
            name: "2",
            m: function () {
                flags.push("original_"+this.name);
            },
        };

        let adap = {
            condition: new SignalComp("a > 1")
        };

        EMA.exhibit(obj1, {a: obj1.x});
        EMA.addPartialMethod(adap, [obj1,obj2], "m", function () {
            flags.push("variation");
        });

        obj1.m();
        obj2.m();

        EMA.deploy(adap); //later deployment
        test.deepEqual(flags, ["original_1","original_2"]);

        test.done();
    },
    'variation-1': function (test) {
        let flags = [];
        let obj1 = {
            name: "1",
            x: new Signal(-1),
            m: function () {
                flags.push("original_"+this.name);
            },
        };

        let obj2 = {
            name: "2",
            m: function () {
                flags.push("original_"+this.name);
            },
        };

        let adap = {
            condition: new SignalComp("a > 1")
        };

        EMA.exhibit(obj1, {a: obj1.x});
        EMA.addPartialMethod(adap, [obj1,obj2], "m", function () {
            flags.push("variation_"+this.name);
        });

        EMA.deploy(adap);
        obj1.x.value = 10;
        obj1.m();
        test.deepEqual(flags, ["variation_1"]);

        test.done();
    },
    'variation-2': function (test) {
        let flags = [];
        let obj1 = {
            name: "1",
            x: new Signal(-1),
            m: function () {
                flags.push("original_"+this.name);
            },
        };

        let obj2 = {
            name: "2",
            m: function () {
                flags.push("original_"+this.name);
            },
        };

        let adap = {
            condition: new SignalComp("a > 1")
        };

        EMA.exhibit(obj1, {a: obj1.x});
        EMA.addPartialMethod(adap, [obj1,obj2], "m", function () {
            flags.push("variation_"+this.name);
        });

        EMA.deploy(adap);
        obj1.x.value = 10;
        obj1.m();
        obj2.m();
        test.deepEqual(flags, ["variation_1","variation_2"]);

        test.done();
    },
    'variation-3': function (test) {
        let flags = [];
        let obj1 = {
            name: "1",
            x: new Signal(-1),
            m: function () {
                flags.push("original_"+this.name);
            },
        };

        let obj2 = {
            name: "2",
            m: function () {
                flags.push("original_"+this.name);
            },
        };

        let adap = {
            condition: new SignalComp("a > 1")
        };

        EMA.exhibit(obj1, {a: obj1.x});
        EMA.addPartialMethod(adap, [obj2,obj1], "m", function () {
            flags.push("variation_"+this.name);
        });

        EMA.deploy(adap);
        obj1.x.value = 10;
        obj1.m();
        obj2.m();
        test.deepEqual(flags, ["variation_1","variation_2"]);

        test.done();
    }
});