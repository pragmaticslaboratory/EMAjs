let {EMA} = require("../../../loader");

let InhabitedLayer = {condition: "", enter: function() {}, exit: function() {}};
EMA.deploy(InhabitedLayer);

let InUseLayer = {condition: "", enter: function() {}, exit: function() {}};
EMA.deploy(InUseLayer);

let layers = EMA.getLayers();
module.exports = {
    InhabitedLayer: layers[0],
    InUseLayer: layers[1]
}