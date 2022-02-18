const Layers = require("./layers");
let {Layer, EMA} = require("../../../loader");

let Room = {
    name: "",
    appliances: [],
    users: 0,
    userEnter: function() {
        this.users += 1;
        this.checkState();
    },
    userExit: function() {
        this.users = Math.max(0, this.users - 1);
        this.checkState();
    },
    checkState: function() {
        if(this.users === 0)
            EMA.deactivate(Layers.InhabitedLayer);
        else
            EMA.activate(Layers.InhabitedLayer);
    },
    getAppliance: function(name) {
        return this.appliances.filter( app => app.name === name)[0];
    },
    playSound: function() {
        console.log("-");
    }
}

EMA.addPartialClassMethod(Layers.InhabitedLayer, Room, "playSound",
    function() {
        this.appliances.forEach(a => {
            a.playSound("Advertise");
            console.log(`ring ${this.name} alarm on: ${a.name}`);
        })
    }
);


module.exports = Room