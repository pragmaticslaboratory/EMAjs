const SignalComp = require('./SignalComp');
const PartialMethodsPool = require('./PartialMethodsPool');
const OriginalMethodsPool = require('./OriginalMethodsPool');


function Layer(originalLayer) {

    this._cond = originalLayer.condition === undefined ?
        new SignalComp("false") : typeof (originalLayer.condition) === "string" ?
            new SignalComp(originalLayer.condition) : originalLayer.condition; //it should be already a signal composition

    this._enter = originalLayer.enter || function () {};
    this._exit = originalLayer.exit || function () {};

    this._active = false;
    this._name = originalLayer.name || "_";
    this.__original__ = originalLayer;

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

    this._installPartialMethod = function() {

        PartialMethodsPool.forEachByLayer(this, function (obj, methodName, partialMethodImpl) {
            obj[methodName] = function () {
                Layer.proceed = function () {      //todo: it currently does not support partial method chain!
                    return Layer._executeOriginalMethod(obj, methodName, arguments);
                };

                let args = arguments;
                let result = function() {
                    //Comienzo  magia de Nicolas con scope (if)
                    let res = partialMethodImpl.apply(obj, args);
                    //final magia de Nicolas con scope
                    return res;
                }();

                Layer.proceed = undefined;
                return result;
            };
        });
    };

    this._uninstallPartialMethods = function() {
        PartialMethodsPool.forEachByLayer(this, function (obj, methodName) {
            obj[methodName] = OriginalMethodsPool.get(obj, methodName);
        });
    };

    Layer._executeOriginalMethod = function(obj, methodName, args) {
        let originalMethod = OriginalMethodsPool.get(obj, methodName);
        if (originalMethod === undefined) throw "No original method found";

        return originalMethod.apply(obj, args);
    }

    this.enableCondition = function() { //todo: when a condition is added, Should it check its predicate?
        let thiz = this;
        this._cond.on(function (active) {
            if (active !== thiz._active) {
                thiz._active = active;
                if (thiz._active) {
                    thiz._enter();
                    thiz._installPartialMethod();
                } else {
                    thiz._exit();
                    thiz._uninstallPartialMethods();
                }
            }
        });
    };

    this.addSignal = function(signal) {
        this._cond.addSignal(signal);
    };

    //This may be used only for debugging
    this.isActive = function() {
        return this._active;
    };

    //Enable condition for layer
    this.enableCondition();
}

module.exports = Layer;


