let {EMA} = require("../../../loader");
const Home = require("./home");
const Layers = require("./layers");

let home = new Home();
let bedroom = home.rooms[1];
let tv = bedroom.getAppliance("tv");


console.log("RUNNING SMARTHOME WITH COP");
EMA.deploy(Layers.InhabitedLayer);
EMA.deploy(Layers.InUseLayer);
home.doorBell();

//user in a room
console.log(" ")
bedroom.userEnter();
home.doorBell();

//user using the tv in the bedroom
console.log(" ");
tv.switch();
tv.setVolume(21);
home.doorBell();

//back to the default behavior
console.log(" ");
tv.switch();
home.doorBell();
bedroom.userExit();
console.log(" ");
home.doorBell();