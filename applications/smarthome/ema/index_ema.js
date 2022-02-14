const Home = require("./home");
const Layers = require("./layers");
let {EMA} = require("../../../loader");

let home = Home;
let bedroom = home.rooms[1];
let tv = bedroom.getAppliance("tv");

//MAGIC TO bE DEFINED
EMA.deploy(Layers.OccupiedLayer);
EMA.deploy(Layers.InUseLayer);

console.log("RUNNING SMARTHOME WITH EMA.js");
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