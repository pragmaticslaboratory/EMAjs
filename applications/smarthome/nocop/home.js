const Room = require("./room");
const Appliance = require("./appliance");

function _createDevices() {
    let doorChime = new Appliance("chime", "hall", true, 100);
    doorChime.setStrategy();
    let tv = new Appliance("tv", "bedroom");
    tv.setStrategy();
    let soundBar = new Appliance("Sound Bar", "Living Room");
    soundBar.setStrategy();
    let radio = new Appliance("Radio", "Kitchcen");
    radio.setStrategy();
    return [doorChime, tv, soundBar, radio];
}

function _createRooms() {
    let appliances = _createDevices();
    let kitchen = new Room("kitchen", []);
    let bedroom = new Room("bedroom", appliances[1]);
    let livingroom = new Room("living", appliances[2]);
    let bathroom = new Room("bathroom", appliances[3]);
    let hall = new Room("hall", appliances[0]);
    return [kitchen, bedroom, livingroom, bathroom, hall];
}

function Home() {
    this.rooms = _createRooms();
    this.strategy = null;
    this.addRoom = function(name, appliances) {
        let r = new Room(name, appliances);
        this.rooms.push(r);
    };
    this.doorBell = function() {
        if(this.strategy)
            this.strategy.doorbell();
    };
    this.checkStatus = function() {
        let occupiedRooms = this.rooms.filter(r => r.users > 0)
        if(occupiedRooms.length === this.rooms.length)
            this.setStrategy("full");
        else if(occupiedRooms.length === 0)
            this.setStrategy("free");
        else
            this.setStrategy("occupied");
    };
    this.setStrategy = function(status) {
        if(status === "free")
            this.strategy = new SilentStrategy(this)
        else if(status === "occupied")
            this.strategy = new SoundStrategy(this);
        else
            this.strategy = new FullHomeStrategy(this);
    }
}

function SilentStrategy(home) {
    Home.call();
    this.doorbell = function() {
        console.log("Just door ring");
    }
}
SilentStrategy.prototype = new Home;

function SoundStrategy(home) {
    Home.call();
    this.doorbell = function() {
        console.log("Door ring + ");
        home.rooms.forEach(r => {
            if(r.users) //Advertice condition
                r.playSound();
        });
    }
}
SoundStrategy.prototype = new Home;

function FullHomeStrategy(home) {
    Home.call();
    this.doorbell = function() {
        console.log("Single door ring in");
        let index = Math.floor(Math.random() * home.rooms.length);
        home.rooms[index].playSound();
    }
}
FullHomeStrategy.prototype = new Home;


module.exports = Home
