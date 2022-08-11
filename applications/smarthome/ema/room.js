const Layers = require("./layers");
let {Signal, Layer, EMA} = require("../../../loader");

let Room = {
    name: "",
    appliances: [],
    users: new Signal(0),
    baby: new Signal(0),
    fullHome: new Signal(0),
    babyInRoom: function() {
        this.baby.value += 1;
    },
    babyLeave: function() {
        this.baby.value = Math.max(0, this.baby.value - 1);
    },
    userEnter: function() {
        if(this.users.value === 0)
           this.fullHome.value += 1;
        this.users.value += 1;
    },
    userExit: function() {
        this.users.value = Math.max(0, this.users.value - 1);
        if(this.users.value === 0)
            this.fullHome.value = Math.max(0, this.fullHome.value - 1);
    },
    getAppliance: function(name) {
        return this.appliances.filter( app => app.name === name)[0];
    },
    playSound: function() {
        console.log("-");
    }
};

EMA.exhibit(Room, {occupied: Room.users});
EMA.exhibit(Room, {withBaby: Room.baby});


module.exports = Room
