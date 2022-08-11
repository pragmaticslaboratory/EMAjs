const Room = require("./room");
const Appliance = require("./appliance");
const Layers = require("./layers");
let {EMA} = require("../../../loader");

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
    doorBell: function() {
        console.log("Just door ring");
    },
}

EMA.addPartialMethod(Layers.OccupiedLayer, Home, "doorBell",
    function() {
        console.log("Door ring + ");
        Home.rooms.forEach(r => {
            r.playSound();
        });
    }
);

EMA.addPartialMethod(Layers.OccupiedLayer, Home.rooms, "playSound",
    function() {
        this.appliances.forEach(a => {
            a.playSound("Advertise");
            console.log(`ring ${this.name} alarm on: ${a.name}`);
        })
    }
);

EMA.addPartialMethod(Layers.InUseLayer,
                Home.rooms.reduce((acc, h) => acc.concat(h.appliances), []),
        "playSound",
    function(message) {
        let display  = this.state.value > 0 ? "on" : "off";
        console.log(`No ${message} to ${this.name} as it is ${display}. Now displaying the message`);
    }
);


module.exports = Home
