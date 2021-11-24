
function Room(name, appliances = []) {
    this.name = name;
    this.appliances = Array.isArray(appliances)? appliances: [appliances];
    this.users = 0;
    this.userEnter = function() {
        this.users += 1;
    }
    this.userExit = function() {
        this.users = Math.max(0, this.users - 1);
    }
    this.getAppliance = function(name) {
        return this.appliances.filter( app => app.name === name)[0];
    }
    this.playSound = function() {
        this.appliances.forEach( a => {
            a.playSound("Advertise");
            console.log(`ring alarm  ${this.name} on: ${a.name}`);
        })
    }
}

module.exports = Room