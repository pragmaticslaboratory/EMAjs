const Layers = require("./layers");
let {Layer, EMA} = require("../../../loader");

function Room(name, appliances = []) {
    this.name = name;
    this.appliances = Array.isArray(appliances)? appliances: [appliances];
    this.users = 0;
    this.userEnter = function() {
        this.users += 1;
        this.checkState();
    };
    this.userExit = function() {
        this.users = Math.max(0, this.users - 1);
        this.checkState();
    };
    this.checkState = function() {
        if(this.users === 0)
            Layers.InhabitedLayer.deactivate();
        else
            Layers.InhabitedLayer.activate();
    };
    this.getAppliance = function(name) {
        return this.appliances.filter( app => app.name === name)[0];
    };
    this.playSound = function() {
        console.log("-");
    };
}

EMA.addPartialMethod(Layers.InhabitedLayer, Room, "playSound",
    function() {
        this.appliances.forEach(a => {
            a.playSound("Advertise");
            console.log(`ring ${this.name} alarm on: ${a.name}`);
        })
    }
);


module.exports = Room