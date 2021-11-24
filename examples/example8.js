let {Signal, Layer, EMA, show} = require("../loader");

let screenSmartPhone = {
    gyroscope: new Signal(0),
    rotate: function () {
        show("Rotating");
    }
};

let playerViewSmartPhone = {
    draw: function () {
        show("Showing a Movie");
    }
};

//this videoGame does not support landscape
let videoGame = {
    draw: function() {
        show("Showing a Video Game");
    }
};

//layer
let landscape = {
    condition: "gyroLevel > 45",
    enter: function () {
        console.log("ENTER TRANSITION");
        screenSmartPhone.rotate();
    },
    exit: function() {
        console.log("EXIT TRANSITION");
    }
};


EMA.exhibit(screenSmartPhone, {gyroLevel: screenSmartPhone.gyroscope});

EMA.addPartialMethod(landscape, playerViewSmartPhone, "draw",
    function () {
        show("[LAYER] Landscape Mode");
        Layer.proceed();
    }
);

EMA.addPartialMethod(landscape, videoGame, "draw",
    function () {
        show("[LAYER] Landscape Mode");
        Layer.proceed();
    }
);

EMA.deploy(landscape);
playerViewSmartPhone.draw();

show("\nChange SmartPhone position");
screenSmartPhone.gyroscope.value = 60;
playerViewSmartPhone.draw();
videoGame.draw();

screenSmartPhone.gyroscope.value = 0;
playerViewSmartPhone.draw();
videoGame.draw();

