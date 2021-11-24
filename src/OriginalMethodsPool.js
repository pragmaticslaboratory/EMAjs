//this class contains all original methods added in EMA
//this class should not remove original methods (only read pool)

class OriginalMethodsPool {

    constructor() {
        if (!OriginalMethodsPool.instance) {
            OriginalMethodsPool.instance = this;
            this.init();
        }
        return OriginalMethodsPool.instance;
    }

    init() {
        this._originalMethods = []; //object x methodName x original_method
    }


    add(obj, methodName) {
        let originalMethod = this.get(obj, methodName);

        if (originalMethod === undefined) {
            this._originalMethods.push([obj, methodName, obj[methodName]]);
        }
    }

    get(obj, methodName) {
        let found = this._originalMethods.find(function (tuple) {
            return obj === tuple[0] && methodName === tuple[1];
        });

        return found === undefined? undefined: found[2];
    }
}

module.exports = new OriginalMethodsPool();