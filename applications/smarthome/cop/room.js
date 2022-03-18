const Layers = require("./layers");
let {Layer, EMA} = require("../../../loader");

let Room = {
    name: "",
    appliances: [],
    users: 0,
    baby: false,
    babyInRoom: function() {
        this.baby = true;
        this.userEnter();
        EMA.activate(Layers.BabyRoomLayer);
    },
    babyLeave: function() {
        this.baby = false;
        this.userExit();
        EMA.deactivate(Layers.BabyRoomLayer);
    },
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



module.exports = Room