let {EMA} = require("../../../loader");

let InhabitedLayer = {name:"inhabited", condition: "", enter: function() {}, exit: function() {}};

let InUseLayer = {name:"inuse", condition: "", enter: function() {}, exit: function() {}};

//let layers = EMA.getLayers();
module.exports = {
    InhabitedLayer: InhabitedLayer,
    InUseLayer: InUseLayer
}