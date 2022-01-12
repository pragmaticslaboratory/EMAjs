let {EMA} = require("../../../loader");

let InhabitedLayer = {condition: "", enter: function() {}, exit: function() {}};
EMA.deploy(InhabitedLayer);

let InUseLayer = {condition: "", enter: function() {}, exit: function() {}};
EMA.deploy(InUseLayer);

module.exports = {
    InhabitedLayer: InhabitedLayer,
    InUseLayer: InUseLayer
}