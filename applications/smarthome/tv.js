const Appliance = require("./nocop/appliance")

function TV(name, room) {
    this.name = name;
    this.state = 0;
    this.volume = 0;
    this.location = room;
    this.display = "off";
    this._switch = function () {
        this.state = !this.state;
    }
    this.setVolume = function (level) {
        this.volume = level;
    }
    this.setLocation = function (location) {
        this.location = location;
    }
    this.turnOn = function () {
        this.display = "on";
        this.switch();
    }
    this.turnOff = function () {
        this.display = "off";
        this._switch();
    }
    this.playSound = function (message) {
        let tempVolume = this.volume;
        if (!this.state) {
            if (tempVolume === 0) this.setVolume(60);
            console.log(`${message} output on ${this.location}'s ${this.name} at ${this.volume}% volume`)
            this.setVolume(tempVolume);
        } else {
            console.log(`Ring alarm on top-right corner of the display, as it is ${this.display}`)
            console.log(message);
        }
    }
}

TV.prototype = Object.create(Appliance.prototype);

module.exports = TV;