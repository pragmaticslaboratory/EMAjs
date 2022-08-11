let {EMA} = require("../../../loader");

let InhabitedLayer = {name:"inhabited", condition: "", enter: function() {}, exit: function() {}};

let InUseLayer = {name:"inuse", condition: "", enter: function() {}, exit: function() {}};

let BabyRoomLayer = {name: "babyRoom", condition: "", enter: function() {}, exit: function() {}};

let FullHomeLayer = {name: "fullHome", condition: "", enter: function() {}, exit: function() {}};

EMA.deploy(InhabitedLayer);
EMA.deploy(InUseLayer);
EMA.deploy(BabyRoomLayer);
EMA.deploy(FullHomeLayer);

module.exports = {
    InhabitedLayer: InhabitedLayer,
    InUseLayer: InUseLayer,
    BabyRoomLayer: BabyRoomLayer,
    FullHomeLayer: FullHomeLayer
}