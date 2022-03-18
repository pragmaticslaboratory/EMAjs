
function Room(name, appliances = []) {
    this.name = name;
    this.strategy = null
    this.appliances = Array.isArray(appliances)? appliances: [appliances];
    this.appliances.forEach(a => a.setStrategy());
    this.users = 0;
    this.baby = false;
    this.babyInRoom = function() {
        this.baby = true;
        this.userEnter();
        this.strategy = new BabyRoomStrategy(this);
    };
    this.babyLeave = function() {
        this.baby = false;
        this.userExit();
    };
    this.userEnter = function() {
        this.users += 1;
        this.strategy = new OccupiedRoomStrategy(this);
    };
    this.userExit = function() {
        this.users = Math.max(0, this.users - 1);
        if(this.users === 0)
            this.strategy = null;
        else
            this.strategy = new OccupiedRoomStrategy(this);
    };
    this.getAppliance = function(name) {
        return this.appliances.filter( app => app.name === name)[0];
    };
    this.playSound = function() {
        if(this.strategy)
            this.strategy.playSound()
    };
}

function OccupiedRoomStrategy(p) {
    Room.call(p.name, p.appliances);
    this.playSound = function() {
        p.appliances.forEach(a => {
            a.playSound("Advertise");
            console.log(`ring ${p.name} alarm on: ${a.name}`);
        })
    }
}
OccupiedRoomStrategy.prototype = new Room;

function BabyRoomStrategy(p) {
    Room.call(p.name, p.appliances);
    this.playSound = function() {
        console.log("Not playing a sound as the baby sleeps");
    }
}
BabyRoomStrategy.prototype = new Room;


module.exports = Room