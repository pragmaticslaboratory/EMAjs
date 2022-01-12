const Layers = require("./layers");
let {Layer, EMA} = require("../../..loader");

function Appliance(name, location, volume = 0) {
    this.name = name;
    this.state = 0;
    this.volume = Math.min(volume, 100);
    this.location = location;
    this.switch = function () {
        this.state = !this.state;
        if(this.state == 0)
            EMA.undeploy(Layers.InUseLayer)
        else
            EMA.deploy(Layers.InUseLayer);
    }

    this.setVolume = function (level) {
        this.volume = level;
    }
    this.setLocation = function (roomName) {
        this.location = roomName;
    }
    this.playSound = function(message) {
        let tempVolume = this.volume;
        if (tempVolume === 0) this.setVolume(60);
        let display  = this.state > 0 ? "on" : "off";
        console.log(`${this.location}'s ${this.name} is ${display}!!`)
        console.log(`${message} output on ${this.location}'s ${this.name} at ${this.volume}% volume`)
        this.setVolume(tempVolume);
    }
}

EMA.addPartialMethod(Layers.InUseLayer, Appliance, "playSound",
    function(message) {
        let display  = this.state > 0 ? "on" : "off";
        console.log(`No ${message} to ${this.name} as it is ${display}. Now displaying the message`);
    }
);

module.exports = Appliance