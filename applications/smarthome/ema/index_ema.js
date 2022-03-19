const Home = require("./home");
const Layers = require("./layers");
let {EMA} = require("../../../loader");

let home = Home;
let bedroom = home.rooms[1];
let tv = bedroom.getAppliance("tv");

//MAGIC TO bE DEFINED
console.log("RUNNING SMARTHOME WITH EMA.js");
home.doorBell();

//user in a room
console.log("\n USER IN ROOM TEST  ")
bedroom.userEnter();
EMA.deploy(Layers.OccupiedLayer); //change to local
home.doorBell();

//user using the tv in the bedroom
console.log("\n APPLIANCE ON TEST ");
tv.switch();
EMA.deploy(Layers.InUseLayer);
tv.setVolume(21);
home.doorBell();

//back to the default behavior
console.log("\n BASE BEHAVIOR TEST ");
tv.switch();
EMA.undeploy(Layers.InUseLayer);
home.doorBell();
bedroom.userExit();
EMA.undeploy(Layers.OccupiedLayer);
console.log(" ");
home.doorBell();

/* BABY IN ROOM TEST */
console.log("\n BABY TEST ");
bedroom.userEnter();
EMA.deploy(Layers.OccupiedLayer);
bedroom.babyInRoom();
EMA.deploy(Layers.BabyRoomLayer);
home.doorBell();
bedroom.babyLeave();
EMA.undeploy(Layers.BabyRoomLayer);
home.doorBell();
bedroom.userExit();
EMA.undeploy(Layers.OccupiedLayer);

/* FULL HOME TEST */
console.log("\n FULL HOME TEST ");
home.rooms.forEach(r => r.userEnter());
home.doorBell();
EMA.deploy(Layers.OccupiedLayer);
console.log(" ")
bedroom.userExit();
EMA.undeploy(Layers.OccupiedLayer); // just for the room
home.doorBell();