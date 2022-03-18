let {EMA} = require("../../../loader");
const Home = require("./home");
const Layers = require("./layers");

let bedroom = Home.rooms[1];
let tv = bedroom.getAppliance("tv");


console.log("RUNNING SMARTHOME WITH COP");
EMA.deploy(Layers.InhabitedLayer);
EMA.deploy(Layers.InUseLayer);
EMA.deploy(Layers.BabyRoomLayer);
EMA.deploy(Layers.FullHomeLayer);
Home.doorBell();

//user in a room
console.log("\n USER IN ROOM TEST ")
bedroom.userEnter();
Home.doorBell();

//user using the tv in the bedroom
console.log("\n APPLIANCE ON TEST ");
tv.switch();
tv.setVolume(21);
Home.doorBell();

//back to the default behavior
console.log("\n BASE BEHAVIOR TEST ");
tv.switch();
Home.doorBell();
bedroom.userExit();
console.log(" ");
Home.doorBell();

/* BABY IN ROOM TEST */
console.log("\n BABY TEST ");
bedroom.userEnter();
bedroom.babyInRoom();
Home.doorBell();
bedroom.babyLeave();
Home.doorBell();
bedroom.userExit();

/* FULL HOME TEST */
console.log("\n FULL HOME TEST ");
Home.rooms.forEach(r => r.userEnter());
Home.checkHome();
Home.doorBell();
console.log(" ")
bedroom.userExit();
Home.checkHome();
Home.doorBell();