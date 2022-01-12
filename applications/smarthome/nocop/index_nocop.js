const Home = require("./home");

let home = new Home();
let bedroom = home.rooms[1];
let tv = bedroom.getAppliance("tv");


console.log("RUNNING SMARTHOME WITH NO COP");
home.setStrategy("free");
home.doorBell();

//user in a room
console.log(" ")
bedroom.userEnter();
home.setStrategy("occupied");
home.doorBell();

//user using the tv in the bedroom
console.log(" ");
tv.switch();
tv.setVolume(21);
home.doorBell();

console.log(" ");
tv.switch();
home.doorBell();
bedroom.userExit();
console.log(" ");
home.setStrategy("free");
home.doorBell();