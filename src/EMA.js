const Layer = require('./Layer');
const PartialMethodsPool = require('./PartialMethodsPool');
const OriginalMethodsPool = require('./OriginalMethodsPool');

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
        this._receiveSignalsForSignalInterfaces(layer);
    }

    undeploy(originalLayer) {
        this._deployedLayers = this._deployedLayers.filter(function (layer) {
            if (layer.__original__ === originalLayer) {
                layer.cleanCondition(); //clean emission of condition
                layer._uninstallPartialMethods(); //uninstall partial methods
                return false;
            }
            return true; // not removing layer
        });
    }

    exhibit(object, signalInterface) {
        this._addSignalInterface(object, signalInterface);
        this._addIdSignal(signalInterface);
        this._exhibitAnInterface(signalInterface);
    }

    addPartialMethod(originalLayer, objs, methodName, partialMethodImpl) {
        objs = Array.isArray(objs)? objs: [objs];
        objs.forEach(obj => {
            OriginalMethodsPool.add(obj, methodName);
            PartialMethodsPool.add(obj, methodName, partialMethodImpl, originalLayer)
        });
    }

    _receiveSignalsForSignalInterfaces(deployedLayer) {    //it is to know if signals are already send data
        this._signalInterfacePool.forEach(function (si) {
            for (let field in si[1]) {
                if (si[1].hasOwnProperty(field)) {
                    deployedLayer.addSignal(si[1][field]);
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