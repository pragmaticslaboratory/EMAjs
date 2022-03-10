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


module.exports = Room
