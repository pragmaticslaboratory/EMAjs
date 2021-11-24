
function Appliance(name, location, volume = 0) {
    this.name = name
    this.state = 0
    this.volume = Math.min(volume, 100)
    this.location = location
    //console.log(this)
}

Appliance.prototype.switch = function() {
        this.state = !this.state
    }

Appliance.prototype.setVolume = function(level) {
        this.volume = level
}

Appliance.prototype.setLocation = function(roomName) {
        this.location = roomName
}

Appliance.prototype.playSound = function(message) {
        if(!this.state) //InUse Condition
            console.log(`${message} output on ${this.location}'s ${this.name} at ${this.volume}%`)
        //Not playing any sound
}


module.exports = Appliance