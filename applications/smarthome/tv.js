const Appliance = require("./appliance")

function TV(name, room) {
    this.name = name
    this.state = 0
    this.volume = 0
    this.location = room
    this.display = "off"
    this.switch = function() {
        this.state = !this.state
    }
    this.setVolume = function(level) {
        this.volume = level
    }
    this.setLocation = function(roomName) {
        this.location = loocation
    }
    this.turnOn = function() {
        this.display = "on";
        this.switch();
    }
    this.playSound = function(message) {
        if(!this.state) {
            console.log(`${message} output on ${this.location}'s ${this.name} at ${this.volume}%`)
        } else {
            console.log(`Ring alarm on top-right corner of the display, as is ${this.display}`)
            console.log(message)
        }
    }
}

module.exports = TV