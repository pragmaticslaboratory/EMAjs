
function Room(name, appliances = []) {
    this.name = name;
    this.strategy = null
    this.appliances = Array.isArray(appliances)? appliances: [appliances];
    this.appliances.forEach(a => a.setStrategy());
    this.users = 0;
    this.userEnter = function() {
        this.users += 1;
        this.strategy = new OccupiedRoomStrategy(this);
    }
    this.userExit = function() {
        this.users = Math.max(0, this.users - 1);
        if(this.users === 0)
            this.strategy = null;
    }
    this.getAppliance = function(name) {
        return this.appliances.filter( app => app.name === name)[0];
    }
    this.playSound = function() {
        if(this.strategy)
            this.strategy.playSound()
    }
}

function OccupiedRoomStrategy(p) {
    Room.call(p.name, p.appliances);
    this.playSound = function() {
        p.appliances.forEach(a => {
            a.playSound("Advertise");
            console.log(`ring alarm  ${this.name} on: ${a.name}`);
        })
    }
}
OccupiedRoomStrategy.prototype = new Room;

module.exports = Room