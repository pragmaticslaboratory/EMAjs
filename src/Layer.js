const SignalComp = require('./SignalComp');


function Layer(originalLayer) {
    Object.defineProperty(this,'name', {
        set: function(name) {
            this._name = name;
        },
        get: function() {
            return this._name;
        }
    });

    Object.defineProperty(this,'condition', {
        get: function() {
            return this._cond;
        }
    });

    this.cleanCondition = function() { //this method is reused when you re-init the condition
        this._cond = new SignalComp(this._cond.expression);
    };

    this.addVariation = function(obj, methodName, variation, originalMethod) {
        this._variations.push([obj, methodName, variation, originalMethod]);
    };

    this._installVariations = function() {
        let thiz = this;
        this._variations.forEach(function (variation) {
            let obj = variation[0];
            let methodName = variation[1];
            let variationMethod = variation[2];
            let originalMethod = variation[3];

            obj[methodName] = function () {
                Layer.proceed = function () {
                    return originalMethod.apply(obj, arguments);
                };

                //magic!!!!
                Object.defineProperty(arguments.callee,"name",{get:function() {return methodName;}});
                let result = variationMethod.apply(obj, arguments);
                Layer.proceed = undefined;

                return result;
            };
        });
    };

    this._uninstallVariations = function() {
        this._variations.forEach(function (variation) {
            let obj = variation[0];
            let methodName = variation[1];
            let originalMethod = variation[3];
            obj[methodName] = originalMethod;
        });
    };

    this.enableCondition = function() { //todo: when a condition is added, Should it check its predicate?
        let thiz = this;
        this._cond.on(function (active) {
            if (active !== thiz._active) {
                thiz._active = active;
                if (thiz._active) {
                    thiz._enter();
                    thiz._installVariations();
                } else {
                    thiz._exit();
                    thiz._uninstallVariations();
                }
            }
        });
    };

    this.isActive = function() { //This may be used only for debugging
        return this._active;
    };

    this.addSignal = function(signal) {
        this._cond.addSignal(signal);
    };

    this._cond = originalLayer.condition === undefined ?
        new SignalComp("false") : typeof (originalLayer.condition) === "string" ?
            new SignalComp(originalLayer.condition) : originalLayer.condition; //it should be already a signal composition

    this._enter = originalLayer.enter || function () {};
    this._exit = originalLayer.exit || function () {};

    this._active = false;
    this._name = originalLayer.name || "_";
    this.__original__ = originalLayer;

    this._variations = [];
    this.enableCondition();
}

module.exports = Layer;


