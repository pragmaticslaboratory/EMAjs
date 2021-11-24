
//this class contains all partial method added in EMA
//this class should not remove partial methods (only read pool)

class PartialMethodsPool {

    constructor() {
        if (!PartialMethodsPool.instance) {
            PartialMethodsPool.instance = this;
            this.init();
        }
        return PartialMethodsPool.instance;
    }

    init() {
        this._partialMethods = []; //originalLayer x object x methodName x partialMethodImpl
    }

    add(originalLayer, obj, methodName, partialMethodImpl) {
        this._partialMethods.push([originalLayer, obj, methodName, partialMethodImpl]);
    }

    _get(layer) {
        return this._partialMethods.filter(function (partialMethod) {
            let originalLayer = partialMethod[0];
            return layer.__original__ === originalLayer;
        });
    }

    forEachByLayer(layer, fun) {
        let partialMethods = this._get(layer);

        partialMethods.forEach(function (pm) {
            let originalLayer = pm[0];
            let obj = pm[1];
            let methodName = pm[2];
            let partialMethodImpl = pm[3];

            fun(originalLayer, obj, methodName, partialMethodImpl);
        });
    }
}

module.exports = new PartialMethodsPool();