let Layer = require('./Layer');
let PartialMethodsPool = require('./PartialMethodsPool');
let OriginalMethodsPool = require('./OriginalMethodsPool');

class EMA {

    constructor() {
        if (!EMA.instance) {
            EMA.instance = this;
            this.init();
        }
        return EMA.instance;
    }

    init() {
        this._deployedLayers = []; //only deployed layers
        this._signalInterfacePool = []; //objects x interface-object
    }

    deploy(originalLayer) {
        let layer = new Layer(originalLayer);
        layer._name = layer._name !== "_" ? layer._name : "Layer_" + (this._deployedLayers.length + 1);

        this._deployedLayers.push(layer);
        this._installPartialMethodForLayer(layer);

        //it is to know if signals are already send data
        this._receiveSignalsForSignalInterfaces(layer);
    }

    undeploy(originalLayer) {
        this._uninstallPartialMethods(originalLayer);
        this._cleanSignalComposition(originalLayer);

        //remove layer
        this._deployedLayers = this._deployedLayers.filter(function (layer) {
            return layer.__original__ !== originalLayer;
        });
    }

    exhibit(object, signalInterface) {
        this._addSignalInterface(object, signalInterface);
        this._addIdSignal(signalInterface);
        this._exhibitAnInterface(signalInterface);
    }

    addPartialMethod(originalLayer, objs, methodName, partialMethodImpl) {
        objs = Array.isArray(objs)? objs: [objs];
        objs.forEach(obj => this._addPartialMethod(originalLayer, obj, methodName, partialMethodImpl));
    }

    _addPartialMethod(originalLayer, obj, methodName, partialMethodImpl) {
        PartialMethodsPool.add(originalLayer, obj, methodName, partialMethodImpl);
    }

    _installPartialMethodForLayer(layer) {
        PartialMethodsPool.forEachByLayer(layer, function (originalLayer, obj, methodName) {
            OriginalMethodsPool.add(obj, methodName);
        });
    }

    _uninstallPartialMethods(originalLayer) {
        this._deployedLayers.forEach(function (layer) {
            if (layer.__original__ === originalLayer) {
                layer._uninstallPartialMethods();
            }
        });
    }

    _receiveSignalsForSignalInterfaces(layer) {
        this._signalInterfacePool.forEach(function (si) {
            for (let field in si[1]) {
                if (si[1].hasOwnProperty(field)) {
                    layer.addSignal(si[1][field]);
                }
            }
        });
    }

    _addSignalInterface(object, signalInterface) {
        this._signalInterfacePool.push([object, signalInterface]);
    }

    _addIdSignal(signalInterface) {
        for (let field in signalInterface) {
            if (signalInterface.hasOwnProperty(field)) {
                signalInterface[field].id = field;
            }
        }
    }

    _exhibitAnInterface(signalInterface) {
        for (let field in signalInterface) {
            if (signalInterface.hasOwnProperty(field)) {
                this._deployedLayers.forEach(function (layer) {
                    layer.addSignal(signalInterface[field]);
                });
            }
        }
    }

    _cleanSignalComposition(originalLayer) {
        let layer = this._deployedLayers.find(function (layer) {
            return layer.__original__ === originalLayer;
        });

        layer.cleanCondition();
    }

    ///**** Methods for TESTING *****///

    //only for testing? (can you remove it?)
    getLayers(filter) {
        filter = filter || function () {
            return true;
        };
        return this._deployedLayers.filter(filter);
    }

    //only for testing? (can you remove it?)
    getActiveLayers() {
        return this.getLayers(function (layer) {
            return layer.isActive()
        })
    };

    //only for testing? (can you remove it?)
    getInactiveLayers() {
        return this.getLayers(function (layer) {
            return !layer.isActive()
        })
    };
}

module.exports = new EMA();