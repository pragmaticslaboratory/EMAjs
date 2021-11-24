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
        screen.rotate();
    },
    scope: function(funName, obj) {
        return !(funName === "draw" && obj === videoGame);
    }
};


EMA.exhibit(screen, {gyroLevel: screen.gyroscope});

EMA.addPartialMethod(landscape, playerView, "draw",
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
playerView.draw();

show("\nChange SmartPhone position");
screen.gyroscope.value = 60;
playerView.draw();
videoGame.draw();
