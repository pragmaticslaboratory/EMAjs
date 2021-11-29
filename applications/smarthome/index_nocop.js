const Home = require("./home");

let home = new Home();
let bedroom = home.rooms[1];
let tv = bedroom.getAppliance("tv");
home.doorBell();

//user in a room
console.log(" ")
bedroom.userEnter();
home.doorBell();

//user using the tv in the bedroom
console.log(" ")
tv.switch()
tv.setVolume(21)
home.doorBell()