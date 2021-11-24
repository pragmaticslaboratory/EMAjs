let testCase = require('nodeunit').testCase;
const Signal = require('../src/Signal');
const EMA = require('../src/EMA');

module.exports = testCase({
    'setUp': function (test) {
        EMA.init();
        test();
    },
    'create': function (test) {
        EMA.deploy({condition: "a > 10"});
        test.equals(EMA.getActiveLayers().length, 0);

        test.done();
    },
    'create-2': function (test) {
        let obj = {
            x: new Signal(9),
            y: 56,
        };

        EMA.deploy({condition: "a > 10"});
        EMA.exhibit(obj, {a: obj.x});
        test.equals(EMA.getActiveLayers().length, 0);

        test.done();
    },
    'activate-0': function (test) {
        let obj = {
            x: new Signal(9),
            y: 56,
        };

        EMA.deploy({condition: "a > 10"});
        EMA.exhibit(obj, {a: obj.x});
        obj.x.value = 15;
        test.equals(EMA.getActiveLayers().length, 1);

        test.done();
    },
    'activate-1': function (test) {
        let obj = {
            x: new Signal(9),
            y: new Signal(0),
        };

        EMA.deploy({condition: "a > 10 && b > 10"});
        EMA.exhibit(obj, {a: obj.x, b: obj.y});
        obj.x.value = 15;
        obj.y.value = 20;
        test.equals(EMA.getActiveLayers().length, 1);

        test.done();
    },
    'activate-2': function (test) {
        let obj1 = {
            x: new Signal(9),
            y: 62,
        };
        let obj2 = {
            x: new Signal(5),
            y: 49,
        };

        EMA.deploy({condition: "a > 10 && b > 10"});
        EMA.exhibit(obj1, {a: obj1.x});
        EMA.exhibit(obj2, {b: obj2.x});
        obj1.x.value = 15;
        test.equals(EMA.getActiveLayers().length, 0);
        obj2.x.value = 34;
        test.equals(EMA.getActiveLayers().length, 1);

        test.done();
    },
    'activate-3': function (test) {
        let obj1 = {
            x: new Signal(9),
            y: 62,
        };
        let obj2 = {
            x: new Signal(5),
            y: 49,
        };

        EMA.exhibit(obj1, {a: obj1.x});
        EMA.exhibit(obj2, {b: obj2.x});
        EMA.deploy({condition: "a > b"});

        test.equals(EMA.getActiveLayers().length, 1);
        obj2.x.value = 34;
        test.equals(EMA.getActiveLayers().length, 0);

        test.done();
    },
    'activate-4': function (test) {
        let obj1 = {
            x: new Signal(1),
            y: 62,
        };
        let obj2 = {
            x: new Signal(2),
            y: 49,
        };

        EMA.deploy({condition: "a > 50"});
        EMA.exhibit(obj1, {a: obj1.x});
        EMA.exhibit(obj2, {a: obj2.x});

        test.equals(EMA.getActiveLayers().length, 0);

        obj1.x.value = 100;
        test.equals(EMA.getActiveLayers().length, 1);
        obj2.x.value = 150;
        test.equals(EMA.getActiveLayers().length, 1);

        test.done();
    },
    'activate-5': function (test) {
        let obj = {
            x: new Signal(1),
            y: 62,
        };

        EMA.deploy({condition: "a > 50"});
        EMA.deploy({condition: "a > 100"});
        EMA.exhibit(obj, {a: obj.x});

        test.equals(EMA.getActiveLayers().length, 0);
        obj.x.value = 60;
        test.equals(EMA.getActiveLayers().length, 1);
        obj.x.value = 110;
        test.equals(EMA.getActiveLayers().length, 2);

        test.done();
    },
    'activate-6': function (test) {
        let obj = {
            x: new Signal(1),
            y: 62,
        };

        EMA.deploy({condition: "a > 50"});
        EMA.deploy({condition: "a > 100"});
        EMA.exhibit(obj, {a: obj.x});

        test.equals(EMA.getActiveLayers().length, 0);
        obj.x.value = 60;
        test.equals(EMA.getActiveLayers().length, 1);
        obj.x.value = 110;
        test.equals(EMA.getActiveLayers().length, 2);

        test.done();
    }
});