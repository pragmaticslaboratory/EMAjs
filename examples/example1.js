let {Signal, SignalComp, Layer, EMA, show} = require("../loader");

let battery = {
    name: "UMIDIGI",
    charge: new Signal(100),
    capacity: 5105
};

let videoCard = {
    graph: function() {
        show("High Performance");
    }
};

//layer
let lowBattery = {
  condition: new SignalComp("level < 30")
};

EMA.exhibit(battery, {level: battery.charge});
EMA.addPartialMethod(lowBattery, videoCard, "graph", function() {show("Low Performance")} );
EMA.deploy(lowBattery);

videoCard.graph();

battery.charge.value = 20;

videoCard.graph();
