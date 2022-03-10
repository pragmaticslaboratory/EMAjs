const Layers = require("./layers");
let {Layer, EMA} = require("../../../loader");

let Appliance = {
    name: "",
    state: 0,
    volume: 50,
    location: "",
    switch: function () {
        this.state = !this.state;
        if(this.state === 0)
            EMA.activate(Layers.InUseLayer);
        else
            EMA.deactivate(Layers.InUseLayer);
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
        let display  = this.state > 0 ? "on" : "off";
        console.log(`${this.location}'s ${this.name} is ${display}!!`)
        console.log(`${message} output on ${this.location}'s ${this.name} at ${this.volume}% volume`)
        this.setVolume(tempVolume);
    }
}

module.exports = Appliance