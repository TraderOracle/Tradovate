// vim: syntax=pine 
const predef = require("./tools/predef");
const meta = require("./tools/meta");
const { ParamType } = meta;
const { px, du, op, min } = require("./tools/graphics");
const StdDev = require('./tools/StdDev');

class PATS {
    init() {
    }
     
    map(d, i, history) {
        const value = d.value();

        const prior = history.prior();
        const pprior = history.get(1);
        if (!prior || !pprior) {
            return;
        }
        
        const high = d.high();
        const low = d.low();
        const phigh = prior.high();
        const plow = prior.low();
        const open = d.open();
        const popen = prior.open();
        const close = d.close();
        const pclose = prior.close();

        const upbar = false
        const downbar = false
        const insidebar = false;
        const outsidebar = false;

        if (high < phigh && low > plow){ // INSIDE BAR
            if (close > pclose && open > popen)
                upbar = true;
            else if (close < pclose && open < popen)
                downbar = true;
            else
            insidebar = true;
          }
          else if (high > phigh && low < plow) { // OUTSIDE BAR
            if (close > pclose && open > popen)
                upbar = true;
            else if (close > phigh || open > phigh)
                upbar = true;
            else if (close < pclose && open < popen)
                downbar = true;
            else if (close < plow || open < plow)
                downbar = true;
            else
            outsidebar = true;
          }
          else if (high > phigh){  // HIGHER
            upbar = true;
          }
          else if (low < plow){  // LOWER
            downbar = true;
          }
          //else
          //  s.setPriceBarColor(index, WHITE);
      
        const rtn = {
            upbar,
            downbar,
        };
        
        let candlestick;
        if (upbar) { candlestick = { color: this.props.buyColor };
        } else if (downbar) {
            candlestick = { color: this.props.sellColor };
        } else if (insidebar) {
            candlestick = { color: this.props.insideColor };
        } else if (outsidebar) {
            candlestick = { color: this.props.outsidebar };
        }
        
        rtn["candlestick"] = candlestick;
        return rtn;
    }
}

module.exports = {
    name: "PATS Trading System",
    description: "PATS Trading System",
    calculator: PATS,
    inputType: meta.InputType.BARS,
    tags: ['TraderOracle'],
    params: {
        buyColor: predef.paramSpecs.color("lime"),
        sellColor: predef.paramSpecs.color("red"),
        insideColor: predef.paramSpecs.color("yellow"),
        outsideColor: predef.paramSpecs.color("blue"),
    },
};

