const Layers = require("./layers");
let {Signal, Layer, EMA} = require("../../../loader");

let Room = {
    name: "",
    appliances: [],
    users: new Signal(0),
    userEnter: function() {
        this.users.value += 1;
    },
    userExit: function() {
        this.users.value = Math.max(0, this.users.value - 1);
    },
    getAppliance: function(name) {
        return this.appliances.filter( app => app.name === name)[0];
    },
    playSound: function() {
        console.log("-");
    }
};

EMA.exhibit(Room, {occupied: Room.users})

EMA.addPartialMethod(Layers.OccupiedLayer, Room, "playSound",
    function() {
        this.appliances.forEach(a => {
            a.playSound("Advertise");
            console.log(`ring ${this.name} alarm on: ${a.name}`);
        })
    }
);


module.exports = Room