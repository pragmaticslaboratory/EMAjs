let {Signal, SignalComp, Layer, EMA, show} = require("../loader");

let smartPhone = {
    houseLocation: new Signal(false)
};

let car = {
    parked: new Signal(false)
};

let lights = {
    turnOn: function () {
        show("Turn on");
    },
    turnOff: function () {
        show("Turn off");
    }
};

//layer
let houseLight = {
  condition: "isHere == true",
  enter: function() {
      lights.turnOn();
  },
};

//two objects exhibiting the same signal
EMA.exhibit(smartPhone,
    {isHere: smartPhone.houseLocation});

EMA.exhibit(car, {isHere: car.parked});

EMA.deploy(houseLight);

//the car is here
car.parked.value = true;


