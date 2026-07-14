# EMAjs

EMAjs is a JavaScript implementation of **EMA (Expressive and Modular Activation)**, a layer activation mechanism for Context-Oriented Programming (COP). EMA lets applications adapt their behavior at runtime while keeping activation conditions, activation scope, and the base program modular.

## Research background

This implementation accompanies the research presented in:

> Paul Leger, Nicolás Cardozo, and Hidehiko Masuhara. **An expressive and modular layer activation mechanism for Context-Oriented Programming.** *Information and Software Technology*, 156 (2023), 107132.

- [Read the paper](https://pleger.github.io/papers/legerAl-IST2023.pdf)
- [DOI: 10.1016/j.infsof.2022.107132](https://doi.org/10.1016/j.infsof.2022.107132)

The paper introduces EMA to address two limitations commonly found in COP activation mechanisms: fixed activation-scope strategies and tight coupling between layers and base code. EMAjs provides the paper's concrete JavaScript implementation, using signals and explicit interfaces to connect application state with layer activation conditions.

## Getting started

EMAjs requires [Node.js](https://nodejs.org/). Clone the repository and install its dependencies:

```bash
git clone https://github.com/pragmaticslaboratory/EMAjs.git
cd EMAjs
npm install
```

## Example 1: Adapting to a low battery level

The small example in [`examples/example1.js`](examples/example1.js) changes a video card's behavior when a battery charge falls below 30 percent.

```javascript
let {Signal, SignalComp, EMA, show} = require("../loader");

let battery = {
    charge: new Signal(100)
};

let videoCard = {
    graph: function () {
        show("High Performance");
    }
};

let lowBattery = {
    condition: new SignalComp("level < 30")
};

EMA.exhibit(battery, {level: battery.charge});
EMA.addPartialMethod(lowBattery, videoCard, "graph", function () {
    show("Low Performance");
});
EMA.deploy(lowBattery);

videoCard.graph();              // High Performance
battery.charge.value = 20;
videoCard.graph();              // Low Performance
```

`EMA.exhibit` exposes the battery signal as `level`, which the layer condition can reference without depending on the battery object's internal field name. After the layer is deployed, changing the signal automatically determines whether the base or adapted behavior is used.

Run the complete example with:

```bash
node examples/example1.js
```

More focused examples are available in the [`examples`](examples) directory.

## Example 2: Smart-home adaptation

The larger application in [`applications/smarthome`](applications/smarthome) models a home whose doorbell behavior adapts to room occupancy, appliances currently in use, and the presence of a baby.

The EMA implementation separates the application into:

- [`home.js`](applications/smarthome/ema/home.js), [`room.js`](applications/smarthome/ema/room.js), and [`appliance.js`](applications/smarthome/ema/appliance.js): the smart-home domain and its base behavior.
- [`layers.js`](applications/smarthome/ema/layers.js): the `OccupiedLayer`, `InUseLayer`, and `BabyRoomLayer` activation conditions.
- [`index_ema.js`](applications/smarthome/ema/index_ema.js): scenarios that change the home's runtime context and demonstrate the resulting adaptations.

For example, when a room becomes occupied, the `OccupiedLayer` adapts the doorbell so its notification is played through the home's appliances. The `InUseLayer` changes how an appliance already in use handles that notification, while the baby-room scenario demonstrates an additional, independently declared activation condition. Together, these cases show how EMAjs models and composes multiple context-dependent behaviors across several objects.

Run the smart-home application with:

```bash
node applications/smarthome/ema/index_ema.js
```

The application also includes [`nocop`](applications/smarthome/nocop) and [`cop`](applications/smarthome/cop) versions for comparison with the EMAjs implementation.

## Authors

[Paul Leger](http://pleger.cl) and Nicolás Cardozo

## License

[MIT](https://opensource.org/licenses/MIT)
