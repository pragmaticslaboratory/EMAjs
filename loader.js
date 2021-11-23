const EMA = require('./src/EMA');
const Layer = require('./src/Layer');
const Signal =  require('./src/Signal');
const SignalComp = require('./src/SignalComp');

module.exports = {
    EMA: EMA,
    Layer: Layer,
    Signal: Signal,
    SignalComp: SignalComp,
    show: console.log
}; 