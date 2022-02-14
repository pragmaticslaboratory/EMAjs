const Room = require("./room");
const Appliance = require("./appliance");
const Layers = require("./layers");
let {Layer, EMA} = require("../../../loader");

function _createDevices() {
    let doorChime = new Appliance("chime", "hall", true, 100);
    let tv = new Appliance("tv", "bedroom");
    let soundBar = new Appliance("Sound Bar", "Living Room");
    let radio = new Appliance("Radio", "Kitchen");
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
    this.addRoom = function(name, appliances) {
        let r = new Room(name, appliances);
        this.rooms.push(r);
    };
    this.doorBell = function() {
        console.log("Just door ring");
    };
}

EMA.addPartialMethod(Layers.InhabitedLayer, Home, "doorBell",
    function() {
        console.log("Door ring + ");
        home.rooms.forEach(r => {
            r.playSound();
        });
    }
);



module.exports = Home
