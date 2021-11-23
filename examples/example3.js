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

//Creating two adaptations
let landscape = {
    condition: new SignalComp("gyroLevel > 45"),
    enter: function () {
        screen.rotate();
    }
};

let portrait = {
    condition: new SignalComp("landscape == false"),
    enter: function () {
        screen.rotate();
    }
};
// End Adaptations


EMA.exhibit(screen, {gyroLevel: screen.gyroscope});
EMA.exhibit(landscape, {landscape: landscape.condition});

//Adding two layers
EMA.addPartialMethod(landscape, playerView, "draw", function () {
    show("[LANDSCAPE-LAYER] Landscape Mode");
    Layer.proceed();
});

EMA.addPartialMethod(portrait, playerView, "draw", function () {
    show("[PORTRAIT-LAYER] Portrait");
    Layer.proceed();
});


EMA.deploy(landscape);
EMA.deploy(portrait);

playerView.draw();
show("\n-Change SmartPhone position");
screen.gyroscope.value = 100;
playerView.draw();

screen.gyroscope.value = 10; //Landscape is over!!!!
playerView.draw();