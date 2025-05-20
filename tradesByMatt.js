const predef = require("./tools/predef");
const meta = require("./tools/meta");
const {px, du, op} = require('./tools/graphics');

class BoostOut_OpenCloseRange {
    init() {
        this._min = Infinity;
        this._max = -Infinity;
        this._last_index = -Infinity;
    }

    map(d, entry_num, history) {
        let first_index = Math.max(0, entry_num-1);
        let initial_entry = history.data[first_index];
        let values = history.data.slice(entry_num - this.props.number_of_candles, entry_num).flatMap(entry => [entry.open(), entry.value()]);
        this._min = Math.min.apply(Math, values);
        this._max = Math.max.apply(Math, values);
        
        let shouldDraw = false;
        let text_y = 0;
        let box_y = 0;
        let fill_color = "blue";
        let line_a = 0;
        let line_b = 0;
        
        if ((this._max - this._min) < this.props.allowed_open_close_spread)
        {
            if ((d.value() - this._max) > (this.props.allowed_open_close_spread * this.props.breakout_strength))
            {
                shouldDraw = true;
                text_y = op(du(d.low()), '+', px(40));
                box_y = op(du(d.low()), '+', px(30));
                line_a = op(du(d.low()), '+', px(8));
                line_b = op(du(d.low()), '+', px(22));
                fill_color = this.props.bullish_bob_color;
            }
            else if ((this._min - d.value()) > (this.props.allowed_open_close_spread * this.props.breakout_strength))
            {
                shouldDraw = true;
                text_y = op(du(d.high()), '-', px(30));
                box_y = op(du(d.high()), '-', px(40));
                line_a = op(du(d.high()), '-', px(8));
                line_b = op(du(d.high()), '-', px(14));
                fill_color = this.props.bearish_bob_color;
            }
        }
        
        return {
   graphics: shouldDraw &&{  
      items: [{
         tag: 'Container',
         key: 'mediumContainer',
         children: [
            {
                        tag: "Text",
                        key: "Bob",
                        point: {
                            x: du(d.index()),
                            y: text_y
                        },
                        text: "BOB",
                        style: { fontSize: 18, fontWeight: "bold", fill: fill_color },
                        textAlignment: "rightMiddle"
            },
            {
               tag: "ContourShapes",
               key: 'circs',
               primitives: [
                  {
                    tag: 'Rectangle',
                    position: {
                        x: op(du(d.index()), '-', px(3)),
                        y: box_y
                    },
                    size: {
                        height: px(18),
                        width: px(40)
                    },
                  },

               ],
               lineStyle: {
                  lineWidth: 4,
                  color: fill_color
               }
            },
            {
                 tag: 'Shapes',
                 key: 'rects',
                 //the rectangle is a primitve
                 primitives: [
                     {
                         tag: 'Rectangle',
                         position: {
                        x: op(du(d.index()), '-', px(3)),
                        y: box_y
                         },
                         size: {
                        height: px(18),
                        width: px(40)
                         }
                     }
                 ],
                 fillStyle: {
                     color: 'black'
                 }
             },
            {
     tag: 'LineSegments',
     key: 'lines',
     lines: [
         {
             tag: 'Line',
             a: {
                 x: du(d.index()),
                 y: line_a,
             },
             b: {
                 x: du(d.index()),
                 y: line_b
             },
             infiniteStart: false,
             infiniteEnd: false
         }
     ],
     lineStyle: {
         lineWidth: 3,
         color: "white"
     }
},
],
      }
      ]
   }
};
}
}

module.exports = {
    name: "BoostOut_OpenCloseRange",
    description: "Boost Out - Open/Close Range",
    calculator: BoostOut_OpenCloseRange,
    inputType: meta.InputType.BARS,
    params: {
        number_of_candles: predef.paramSpecs.period(5),
        allowed_open_close_spread : {
                type: meta.ParamType.NUMBER,
                def: 13,
                restrictions: {
                    step: 1,
                    min: 1
                },
                validate(value) {
                    if (value < 1) {
                        return "alley width should be a positive number";
                    }
                    return undefined;
                }
            },
        breakout_strength : predef.paramSpecs.percent(0.33, 0.01, 0.25, 3.00),
        bullish_bob_color : predef.paramSpecs.color("green"),
        bearish_bob_color : predef.paramSpecs.color("red")
    },
    tags: ["Memes by Matt"],
    plots: {
        bearish: { title: 'Bearish BOB', displayOnly: true },
        bullish: { title: 'Bullish BOB', displayOnly: true }
    },
    schemeStyles: {
        dark: {
            bullishBob : {color: "green"},
            bearishBob : {color: "red"}
        }
    }
};
