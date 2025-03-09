const predef = require("./tools/predef");
const meta = require("./tools/meta");
const { px, du } = require("./tools/graphics");

class Killpips {
    init() {
        this.PipsValues = undefined;
        
        this.VAH = undefined;
        this.VAL = undefined;
        this.HV = undefined;

        this.Vixr1 = undefined;
        this.Vixr2 = undefined;
        this.Vixs1 = undefined;
        this.Vixs2 = undefined;

        this.DexpMAX = undefined;
        this.DexpMIN = undefined;
        this.RangeDailyMin = undefined;
        this.RangeDailyMax = undefined;

        this.RD0 = undefined;
        this.RD1 = undefined;
        this.RD2 = undefined;

        this.SD0 = undefined;
        this.SD1 = undefined;
        this.SD2 = undefined;
    }

    map(d) {
        return {
            VAH: this.props.VAH,
            VAL: this.props.VAL,
            HV: this.props.HV,
            Vixr1: this.props.Vixr1,
            Vixr2: this.props.Vixr2,
            Vixs1: this.props.Vixs1,
            Vixs2: this.props.Vixs2,
            DexpMAX: this.props.DexpMAX,
            DexpMIN: this.props.DexpMIN,
            RangeDailyMin: this.props.RangeDailyMin,
            RangeDailyMax: this.props.RangeDailyMax,
            RD0: this.props.RD0,
            RD1: this.props.RD1,
            RD2: this.props.RD2,
            SD0: this.props.SD0,
            SD1: this.props.SD1,
            SD2: this.props.SD2,
            graphics: d.isLast() ? {
                items: [
                    this.props.HV && {
                        tag: 'Text',
                        key: 'HVLabel',
                        point: { x: du(d.index() + 1), y: du(this.props.HV) },
                        text: `HV: ${this.props.HV}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('white') },
                        textAlignment: 'centerAbove'
                    },
                    this.props.RD0 && {
                        tag: 'Text',
                        key: 'RD0Label',
                        point: { x: du(d.index() + 1), y: du(this.props.RD0) },
                        text: `RDO: ${this.props.RD0}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('lime') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.RD1 && {
                        tag: 'Text',
                        key: 'RD1Label',
                        point: { x: du(d.index() + 1), y: du(this.props.RD1) },
                        text: `RD1: ${this.props.RD1}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('lime') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.RD2 && {
                        tag: 'Text',
                        key: 'RD2Label',
                        point: { x: du(d.index() + 1), y: du(this.props.RD2) },
                        text: `RD2: ${this.props.RD2}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('lime') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.SD0 && {
                        tag: 'Text',
                        key: 'SD0Label',
                        point: { x: du(d.index() + 1), y: du(this.props.SD0) },
                        text: `SD0: ${this.props.SD0}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('red') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.SD1 && {
                        tag: 'Text',
                        key: 'SD1Label',
                        point: { x: du(d.index() + 1), y: du(this.props.SD1) },
                        text: `SD1: ${this.props.SD1}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('red') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.SD2 && {
                        tag: 'Text',
                        key: 'SD2Label',
                        point: { x: du(d.index() + 1), y: du(this.props.SD2) },
                        text: `SD2: ${this.props.SD2}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('red') },
                        textAlignment: 'centerBelow'
                    },

                    this.props.Vixr1 && {
                        tag: 'Text',
                        key: 'Vixr1Label',
                        point: { x: du(d.index() + 1), y: du(this.props.Vixr1) },
                        text: `Vixr1: ${this.props.Vixr1}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('red') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.Vixr2 && {
                        tag: 'Text',
                        key: 'Vixr2Label',
                        point: { x: du(d.index() + 1), y: du(this.props.Vixr2) },
                        text: `Vixr2: ${this.props.Vixr2}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('red') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.Vixs1 && {
                        tag: 'Text',
                        key: 'Vixs1Label',
                        point: { x: du(d.index() + 1), y: du(this.props.Vixs1) },
                        text: `Vixs1: ${this.props.Vixs1}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('red') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.Vixs2 && {
                        tag: 'Text',
                        key: 'Vixs2Label',
                        point: { x: du(d.index() + 1), y: du(this.props.Vixs2) },
                        text: `Vixs2: ${this.props.Vixs2}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('red') },
                        textAlignment: 'centerBelow'
                    },

                    this.props.VAH && {
                        tag: 'Text',
                        key: 'VAHLabel',
                        point: { x: du(d.index() + 1), y: du(this.props.VAH) },
                        text: `VAH: ${this.props.VAH}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('white') },
                        textAlignment: 'centerBelow'
                    },                    
                    this.props.VAL && {
                        tag: 'Text',
                        key: 'VALLabel',
                        point: { x: du(d.index() + 1), y: du(this.props.VAL) },
                        text: `VAL: ${this.props.VAL}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('white') },
                        textAlignment: 'centerBelow'
                    },

                    this.props.DexpMAX && {
                        tag: 'Text',
                        key: 'DexpMAXLabel',
                        point: { x: du(d.index() + 1), y: du(this.props.DexpMAX) },
                        text: `DexpMAX: ${this.props.DexpMAX}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('white') },
                        textAlignment: 'centerBelow'
                    },                    
                    this.props.DexpMIN && {
                        tag: 'Text',
                        key: 'DexpMINLabel',
                        point: { x: du(d.index() + 1), y: du(this.props.DexpMIN) },
                        text: `DexpMIN: ${this.props.DexpMIN}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('white') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.VAH && {
                        tag: 'Text',
                        key: 'RangeDailyMinabel',
                        point: { x: du(d.index() + 1), y: du(this.props.RangeDailyMin) },
                        text: `RangeDailyMin: ${this.props.RangeDailyMin}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('white') },
                        textAlignment: 'centerBelow'
                    },                    
                    this.props.VAL && {
                        tag: 'Text',
                        key: 'RangeDailyMaxLabel',
                        point: { x: du(d.index() + 1), y: du(this.props.RangeDailyMax) },
                        text: `RangeDailyMax: ${this.props.RangeDailyMax}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('white') },
                        textAlignment: 'centerBelow'
                    }

                ].filter(Boolean)
            }: undefined
        };
    }
}

    module.exports = {
        name: "TO - Killpips",
        title: "TO - Killpips",
        description: "TO - Killpips",
        tags: ["TraderOracle", "Killpips", "Kilpips"],
        calculator: Killpips,
        params: {
            Vixr1: predef.paramSpecs.number(),
            Vixr2: predef.paramSpecs.number(),
            Vixs1: predef.paramSpecs.number(),
            Vixs2: predef.paramSpecs.number(),

            DexpMAX: predef.paramSpecs.number(),
            DexpMIN: predef.paramSpecs.number(),

            RD0: predef.paramSpecs.number(),
            RD1: predef.paramSpecs.number(),
            RD2: predef.paramSpecs.number(),
            SD0: predef.paramSpecs.number(),
            SD1: predef.paramSpecs.number(),
            SD2: predef.paramSpecs.number(),

            HV: predef.paramSpecs.number(),
            VAH: predef.paramSpecs.number(),
            VAL: predef.paramSpecs.number(),

            RangeDailyMax: predef.paramSpecs.number(),
            RangeDailyMin: predef.paramSpecs.number(),

        },
        plots: {
            VAH: { title: "Value Area High" },
            VAL: { title: "Value Area Low" },
            HV: { title: "Line In The Sand" },
            Vixr1: { title: "Vix R1" },
            Vixr2: { title: "Vix R2" },
            Vixs1: { title: "Vix S1" },
            Vixs2: { title: "Vix S2" },
            DexpMAX: { title: "Pips MAX" },
            DexpMIN: { title: "Pips MIN" },
            RangeDailyMin: { title: "Range Daily Min" },
            RangeDailyMax: { title: "Range Daily Max" },
            RD0: { title: "Long 1" },
            RD1: { title: "Long 2" },
            RD2: { title: "Long 3" },
            SD0: { title: "Short 1" },
            SD1: { title: "Short 2" },
            SD2: { title: "Short 3" }
        },
        tags: ["TraderOracle"],
        schemeStyles: {
            dark: {
                VAH: predef.styles.plot({ lineWidth: 3, color: "#ff0000", opacity: 80, lineStyle: 5 }),
                VAL: predef.styles.plot({ lineWidth: 3, color: "#00ff55", opacity: 80, lineStyle: 3 }),
                HV: predef.styles.plot({ lineWidth: 3, color: "#f0df26", opacity: 80, lineStyle: 3 }),
                Vixr1: predef.styles.plot({ color: "#b5ffd4", opacity: 100, lineStyle: 1 }),
                Vixr2: predef.styles.plot({ color: "#b5ffd4", opacity: 100, lineStyle: 1 }),
                Vixs1: predef.styles.plot({ color: "#fc9292", opacity: 100, lineStyle: 1 }),
                Vixs2: predef.styles.plot({ color: "#fc9292", opacity: 100, lineStyle: 1 }),
                DexpMAX: predef.styles.plot({ color: "#ff0000", opacity: 100, lineStyle: 4 }),
                DexpMIN: predef.styles.plot({ color: "#00ff55", opacity: 100, lineStyle: 4 }),
                RangeDailyMin: predef.styles.plot({ lineWidth: 3, color: "#00ff55", opacity: 100, lineStyle: 2 }),
                RangeDailyMax: predef.styles.plot({ lineWidth: 3, color: "#ff0000", opacity: 100, lineStyle: 2 }),
                RD0: predef.styles.plot({ color: "#00ff55", opacity: 100, lineStyle: 5 }),
                RD1: predef.styles.plot({ color: "#00ff55", opacity: 100, lineStyle: 5 }),
                RD2: predef.styles.plot({ color: "#00ff55", opacity: 100, lineStyle: 5 }),
                SD0: predef.styles.plot({ color: "#ff0000", opacity: 100, lineStyle: 5 }),
                SD1: predef.styles.plot({ color: "#ff0000", opacity: 100, lineStyle: 5 }),
                SD2: predef.styles.plot({ color: "#ff0000", opacity: 100, lineStyle: 5 }),
            }
        }
};