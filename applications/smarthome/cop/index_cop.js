let {EMA} = require("../../../loader");
const Home = require("./home");
const Layers = require("./layers");

let bedroom = Home.rooms[1];
let tv = bedroom.getAppliance("tv");


console.log("RUNNING SMARTHOME WITH COP");
EMA.deploy(Layers.InhabitedLayer);
EMA.deploy(Layers.InUseLayer);
Home.doorBell();

//user in a room
console.log(" ")
bedroom.userEnter();
Home.doorBell();

//user using the tv in the bedroom
console.log(" ");
tv.switch();
tv.setVolume(21);
Home.doorBell();

//back to the default behavior
console.log(" ");
tv.switch();
Home.doorBell();
bedroom.userExit();
console.log(" ");
Home.doorBell();