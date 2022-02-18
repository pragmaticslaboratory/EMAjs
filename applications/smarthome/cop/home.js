const Room = require("./room");
const Appliance = require("./appliance");
const Layers = require("./layers");
let {Layer, EMA} = require("../../../loader");

function _createDevices() {
    let doorChime = Object.create(Appliance);
    doorChime.name = "chime"; doorChime.setLocation("hall"); doorChime.setVolume(100);
    let tv = Object.create(Appliance);
    tv.name = "tv"; tv.setLocation("bedroom");
    let soundBar = Object.create(Appliance);
    soundBar.name = "Sound Bar"; soundBar.setLocation("Living Room");
    let radio = Object.create(Appliance);
    radio.name = "Radio"; radio.setLocation("Kitchen");
    return [doorChime, tv, soundBar, radio];
}

function _createRooms() {
    let appliances = _createDevices();
    let kitchen = Object.create(Room);
    kitchen.name = "kitchen"; kitchen.appliances = [];
    let bedroom = Object.create(Room);
    bedroom.name = "bedroom"; bedroom.appliances = [appliances[1]];
    let livingroom = Object.create(Room);
    livingroom.name = "living"; livingroom.appliances = [appliances[2]];
    let bathroom = Object.create(Room);
    bathroom.name = "bathroom"; bathroom.appliances = [appliances[3]];
    let hall = Object.create(Room);
    hall.name = "hall"; hall.appliances = [appliances[0]];
    return [kitchen, bedroom, livingroom, bathroom, hall];
}

let Home = {
    rooms: _createRooms(),
    addRoom: function(name, appliances) {
        let r = new Room(name, appliances);
        this.rooms.push(r);
    },
    doorBell: function() {
        console.log("Just door ring");
    }
}

EMA.addPartialClassMethod(Layers.InhabitedLayer, Home, "doorBell",
    function() {
        console.log("Door ring + ");
        home.rooms.forEach(r => {
            r.playSound();
        });
    }
);



module.exports = Home
