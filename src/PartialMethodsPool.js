
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
        this._partialMethods = []; // object x methodName x partialMethodImpl x originalLayer
    }

    add(obj, methodName, partialMethodImpl, originalLayer) {
        this._partialMethods.push([obj, methodName, partialMethodImpl, originalLayer]);
    }

    _get(deployedLayer) {
        return this._partialMethods.filter(function (partialMethod) {
            let originalLayer = partialMethod[3];
            return deployedLayer.__original__ === originalLayer;
        });
    }

    forEachByLayer(layer, fun) { //fun:  obj, methodName, partialMethodImpl, originalLayer
        let partialMethods = this._get(layer);

        partialMethods.forEach(function (pm) {
            let obj = pm[0];
            let methodName = pm[1];
            let partialMethodImpl = pm[2];
            let originalLayer = pm[3];

            fun(obj, methodName, partialMethodImpl, originalLayer);
        });
    }
}

module.exports = new PartialMethodsPool();