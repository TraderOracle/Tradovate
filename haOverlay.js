const predef = require("./tools/predef");
const meta = require("./tools/meta");
const SMA = require("./tools/SMA");
const EMA = require("./tools/EMA");
const WMA = require("./tools/WMA");
const p = require("./tools/plotting");

class heikinAshi_Overlay {

    init() {
        
    }

    map(d, i, history) {
        // Initialize Variables
        const prevd =  i > 0 ? history.prior() : d;
        this.prevClose = prevd.close();
        this.prevHigh = prevd.high();
        this.prevLow = prevd.low();
        this.prevOpen = prevd.open();
        this.prevHaOpen = this.currHaOpen;
        this.prevHaClose = this.currHaClose;
        
        this.currOpen = d.open();
        this.currHigh = d.high();
        this.currLow = d.low();
        this.currClose = d.close();


        if (isNaN(this.prevHaOpen)) {
            this.prevHaOpen = (this.prevOpen + this.prevHigh + this.prevLow + this.prevClose) / 4.0;
        }
        
        this.currHaOpen = (this.prevHaOpen + (this.prevOpen + this.prevHigh + this.prevLow + this.prevClose) / 4.0) / 2.0;
        this.currHaClose = (this.currOpen + this.currHigh + this.currLow + this.currClose) / 4.0;
        
        return {
            haOpen: this.currHaOpen,
            haHigh: Math.max(this.currHigh, this.currOpen, this.currClose),
            haLow: Math.min(this.currLow, this.currOpen, this.currClose),
            haClose: this.currHaClose,
            candlestick: {
                color: this.props.hideCandles ? "transparent" : null
            },
            style: {
                value: {
                    color: this.props.hideCandles ? "transparent" : null
                }
            },
        };
    }
}

function candlestickPlotter(canvas, indicatorInstance, history) {
    for (let i = 0; i < history.data.length; ++i) {
        const item = history.get(i);
        if (item.haOpen !== undefined
            && item.haHigh !== undefined
            && item.haLow !== undefined
            && item.haClose !== undefined) {
            const x = p.x.get(item);

            // candle body
            canvas.drawLine(
                p.offset(x, item.haOpen),
                p.offset(x, item.haClose),
                {
                    color: item.haOpen > item.haClose ? indicatorInstance.props.fallingColor : indicatorInstance.props.risingColor,
                    relativeWidth: 0.9,
                });

            // candle wicks   
            canvas.drawLine(
                p.offset(x, item.haHigh),
                p.offset(x, item.haLow),
                {
                    color: item.haOpen > item.haClose ? indicatorInstance.props.fallingColor : indicatorInstance.props.risingColor,
                    relativeWidth: 0.2,
                });
        }
    }
}

module.exports = {
    name: "heikinAshi_Overlay",
    description: "Heikin Ashi Overlay",
    calculator: heikinAshi_Overlay,
    params: {
        hideCandles: predef.paramSpecs.bool(false),
        risingColor: predef.paramSpecs.color("green"),
        fallingColor: predef.paramSpecs.color("red")
    },
    inputType: meta.InputType.BARS,
    plotter: [
        predef.plotters.custom(candlestickPlotter)
    ]
};
