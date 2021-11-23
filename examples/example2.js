let {Signal, SignalComp, Layer, EMA, show} = require("../loader");

let screen = {
    gyroscope: new Signal(0),
    rotate: function () {
        show("Rotating");
    }
};

let playerView = {
    draw: function () {
        show("Showing a Movie");
    }
};

//adaptation
let landscape = {
    condition: "gyroLevel > 45",
    enter: function () {
        console.log("ENTER TRANSITION");
        screen.rotate();
    }
};


EMA.exhibit(screen, {gyroLevel: screen.gyroscope});

EMA.addPartialMethod(landscape, playerView, "draw",
    function () {
        Layer.proceed();
        show("[LAYER] Landscape Mode");
    }
);


EMA.deploy(landscape);
playerView.draw();

show("\nChange SmartPhone position");
screen.gyroscope.value = 60;
playerView.draw();
