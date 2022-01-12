const Home = require("./home");

let home = new Home();
let bedroom = home.rooms[1];
let tv = bedroom.getAppliance("tv");

//MAGIC TO bE DEFINED

console.log("RUNNING SMARTHOME WITH EMA.js");