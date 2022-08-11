let {EMA} = require("../../../loader");

let OccupiedLayer = {name:"occupied", condition: "occupied > 0", enter: function() {}, exit: function() {}};

let InUseLayer = {name:"inuse", condition: "inUse != 0", enter: function() {}, exit: function() {}};

BabyCondition = "withBaby > 0"
let BabyRoomLayer = {name: "silent", condition: BabyCondition, enter: function() {}, exit: function() {}};

//let layers = EMA.getLayers();
module.exports = {
    OccupiedLayer: OccupiedLayer,
    InUseLayer: InUseLayer,
    BabyRoomLayer: BabyRoomLayer,
    BabyCondition: BabyCondition,
}