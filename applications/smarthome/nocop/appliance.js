function Appliance(name, location, volume = 0) {
    this.name = name;
    this.state = 0;
    this.volume = Math.min(volume, 100);
    this.location = location;
    this.strategy;
    this.switch = function () {
        this.state = !this.state;
        this.setStrategy();
    }
    this.setStrategy = function() {
        this.strategy = this.state == 0 ? new FreeStrategy(this) :  new InUseStrategy(this);
    }
    this.setVolume = function (level) {
        this.volume = level;
    }
    this.setLocation = function (roomName) {
        this.location = roomName;
    }
    this.playSound = function(message) {
        this.strategy.playSound(message);
    }
}

function FreeStrategy(p) {
    Appliance.call(p.name, p.location, p.volume);
    this.playSound = function(message) {
        let tempVolume = p.volume;
        if (tempVolume === 0) p.setVolume(60);
        let display  = p.state > 0 ? "on" : "off";
        console.log(`${p.location}'s ${p.name} is ${display}!!`)
        console.log(`${message} output on ${p.location}'s ${p.name} at ${p.volume}% volume`)
        p.setVolume(tempVolume);
    }
}
FreeStrategy.prototype = new Appliance;


function InUseStrategy(p) {
    Appliance.call(p.name, p.location, p.volume);
    this.playSound = function(message) {
        let display  = p.state > 0 ? "on" : "off";
        console.log(`No ${message} to ${p.name} as it is ${display}. Now displaying the message`);
    }
}
InUseStrategy.prototype = new Appliance;



module.exports = Appliance