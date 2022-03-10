const Layers = require("./layers");
let {Signal, Layer, EMA} = require("../../../loader");

let Appliance = {
    name: "",
    state: new Signal(0),
    volume: 50,
    location: "",
    switch: function () {
        this.state.value = !this.state.value;
    },
    setVolume: function (level) {
        this.volume = level;
    },
    setLocation: function (roomName) {
        this.location = roomName;
    },
    playSound: function(message) {
        let tempVolume = this.volume;
        if (tempVolume === 0) this.setVolume(60);
        let display  = this.state.value > 0 ? "on" : "off";
        console.log(`${this.location}'s ${this.name} is ${display}!!`)
        console.log(`${message} output on ${this.location}'s ${this.name} at ${this.volume}% volume`)
        this.setVolume(tempVolume);
    }
};

EMA.exhibit(Appliance, {inUse: Appliance.state});


module.exports = Appliance