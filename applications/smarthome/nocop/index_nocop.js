const Home = require("./home");

let home = new Home();
let bedroom = home.rooms[1];
let tv = bedroom.getAppliance("tv");


console.log("RUNNING SMARTHOME WITH NO COP");
home.checkStatus(); //home is free
home.doorBell();

/* USER IN A ROOM TEST */
console.log(" ")
bedroom.userEnter();
home.checkStatus(); //home is occupied
home.doorBell();

/* APPLIANCE IN USE TEST */
console.log(" ");
tv.switch();
tv.setVolume(21);
home.doorBell();

console.log(" ");
tv.switch();
home.doorBell();
bedroom.userExit();
console.log(" ");
home.checkStatus(); //home is free
home.doorBell();

/* BABY IN ROOM TEST */
console.log(" ");
bedroom.userEnter();
bedroom.babyInRoom();
home.checkStatus();
home.doorBell();
bedroom.babyLeave();
home.doorBell();

/* FULL HOME TEST */
console.log(" ");
home.rooms.forEach(r => r.userEnter());
home.checkStatus(); //home is full
home.doorBell();