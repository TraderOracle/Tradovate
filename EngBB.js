const predef = require("./tools/predef");
const meta = require("./tools/meta");
const { ParamType } = meta;
const { px, du, op, min } = require("./tools/graphics");
const StdDev = require('./tools/StdDev');

class TOMethod {
    init() {
        this.stdDev = StdDev(20);
    }
    
    map(d, i, history) {

        const prior = history.prior();
        const pprior = history.get(1);
        if (!prior || !pprior) {
            return;
        }
        
        const stdev = this.stdDev(d.value());
        const avg = this.stdDev.avg();
        const halfWidth = stdev * 2;
        const lowerBand = avg - halfWidth;
        const upperBand = avg + halfWidth;
        const c0Body = Math.abs(d.open() - d.close())
        const c1Body = Math.abs(prior.open() - prior.close())
        const c0G = d.close() > d.open();
        const c0R = d.close() < d.open();
        const c1G = prior.close() > prior.open();
        const c1R = prior.close() < prior.open();

        const inside = (d.high() >= upperBand || prior.high() >= upperBand) && 
            (c0Body > c1Body) && 
            (c0R && c1G) && 
            (d.close() < prior.open() || d.close() == prior.open())

        const outside = (d.low() <= lowerBand || prior.low() <= lowerBand) && 
            (c0Body > c1Body) && 
            (c0G && c1R) && 
            (d.close() > prior.open() || d.close() == prior.open())

        const rtn = {
            inside,
            outside,
        };
        
        let candlestick;
        let color = "green";
        if (inside) {
            color = c0G ? this.props.insideColor : this.props.insideDownColor;
            candlestick = { color: color };
        } else if (outside) {
            color = c0G ? this.props.outsideColor : this.props.outsideDownColor;
            candlestick = { color: color };
        }
        
        rtn["candlestick"] = candlestick;
        return rtn;
    }
}

module.exports = {
    name: "TO Method",
    description: "TO - Method",
    calculator: TOMethod,
    inputType: meta.InputType.BARS,
    tags: ['TraderOracle'],
    params: {
        insideColor: predef.paramSpecs.color("yellow"),
        insideDownColor: predef.paramSpecs.color("yellow"),
        outsideColor: predef.paramSpecs.color("pink"),
        outsideDownColor: predef.paramSpecs.color("pink"),
        
    },
};

