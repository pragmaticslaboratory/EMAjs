const {InUse} = require("./appliance");

function Appliance(name, location, volume = 0) {
    this.name = name;
    this.state = 0;
    this.volume = Math.min(volume, 100);
    this.location = location;
    //console.log(this)
}

Appliance.prototype.switch = function() {
        this.state = !this.state
    }

Appliance.prototype.setVolume = function(level) {
        this.volume = level;
}

Appliance.prototype.setLocation = function(roomName) {
        this.location = roomName;
}

Appliance.prototype.playSound = function(message) {
    //Appliance not in use, play sound
    let tempVolume = this.volume;
    if (tempVolume === 0) this.setVolume(60);
    console.log(`${message} output on ${this.location}'s ${this.name} at ${this.volume}% volume`)
    this.setVolume(tempVolume);
}

let InUse = function() {};
InUse.prototype = Object.create(Appliance.prototype);
InUse.prototype.playSound = function(message) {
    console.log(`No ${message} to display as ${this.name} is ${this.display}`)
}


module.exports = {
    BaseAppliance: Appliance,
    InUseAppliance: InUse
}