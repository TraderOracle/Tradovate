const predef = require("./tools/predef");
const meta = require("./tools/meta");
const { px, du } = require("./tools/graphics");

class MenthorQ {
    init() {
        this.PipsValues = undefined;
        
        this.CallResistance = undefined;
        this.PutSupport = undefined;
        this.HVL = undefined;
        this.OneDMin = undefined;
        this.OneDMax = undefined;
        this.CallResistance = undefined;
        this.PutSupport = undefined;
        this.HVL0DTE = undefined;
        this.GammaWall0DTE = undefined;
        this.GEX1 = undefined;
        this.GEX2 = undefined;
        this.GEX3 = undefined;
        this.GEX4 = undefined;
        this.GEX5 = undefined;
        this.GEX6 = undefined;
        this.GEX7 = undefined;
        this.GEX8 = undefined;
        this.GEX9 = undefined;
        this.GEX10 = undefined;
    }

    map(d) {
        return {
            CallResistance: this.props.CallResistance,
            PutSupport: this.props.PutSupport,
            HVL: this.props.HVL,
            OneDMin: this.props.OneDMin,
            OneDMax: this.props.OneDMax,
            CallResistance0DTE: this.props.CallResistance0DTE,
            PutSupport0DTE: this.props.PutSupport0DTE,
            HVL0DTE: this.props.HVL0DTE,
            GammaWall0DTE: this.props.GammaWall0DTE,
            GEX1: this.props.GEX1,
            GEX2: this.props.GEX2,
            GEX3: this.props.GEX3,
            GEX4: this.props.GEX4,
            GEX5: this.props.GEX5,
            GEX6: this.props.GEX6,
            GEX7: this.props.GEX7,
            GEX8: this.props.GEX8,
            GEX9: this.props.GEX9,
            GEX10: this.props.GEX10,
            graphics: d.isLast() ? {
                items: [

                    this.props.CallResistance && {
                        tag: 'Text',
                        key: 'Vixs1Label',
                        point: { x: du(d.index() + 1), y: du(this.props.CallResistance) },
                        text: `Call Resistance: ${this.props.CallResistance}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('red') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.PutSupport && {
                        tag: 'Text',
                        key: 'Vixs2Label',
                        point: { x: du(d.index() + 1), y: du(this.props.PutSupport) },
                        text: `Put Support: ${this.props.PutSupport}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('red') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.HVL && {
                        tag: 'Text',
                        key: 'HVLabel',
                        point: { x: du(d.index() + 1), y: du(this.props.HVL) },
                        text: `HVL: ${this.props.HVL}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('white') },
                        textAlignment: 'centerAbove'
                    },

                    this.props.OneDMin && {
                        tag: 'Text',
                        key: 'Vixr1Label',
                        point: { x: du(d.index() + 1), y: du(this.props.OneDMin) },
                        text: `1 Day Min: ${this.props.OneDMin}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('red') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.OneDMax && {
                        tag: 'Text',
                        key: 'Vixr2Label',
                        point: { x: du(d.index() + 1), y: du(this.props.OneDMax) },
                        text: `1 Day Max: ${this.props.OneDMax}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('red') },
                        textAlignment: 'centerBelow'
                    },

                    this.props.CallResistance0DTE && {
                        tag: 'Text',
                        key: 'Vixs1Label',
                        point: { x: du(d.index() + 1), y: du(this.props.CallResistance0DTE) },
                        text: `Call Resistance 0DTE: ${this.props.CallResistance0DTE}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('red') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.PutSupport0DTE && {
                        tag: 'Text',
                        key: 'Vixs2Label',
                        point: { x: du(d.index() + 1), y: du(this.props.PutSupport0DTE) },
                        text: `Put Support 0DTE: ${this.props.PutSupport0DTE}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('red') },
                        textAlignment: 'centerBelow'
                    },

                    this.props.HVL0DTE && {
                        tag: 'Text',
                        key: 'DexpMAXLabel',
                        point: { x: du(d.index() + 1), y: du(this.props.HVL0DTE) },
                        text: `HVL 0DTE: ${this.props.HVL0DTE}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('white') },
                        textAlignment: 'centerBelow'
                    },                    
                    this.props.GammaWall0DTE && {
                        tag: 'Text',
                        key: 'GammaWall0DTELabel',
                        point: { x: du(d.index() + 1), y: du(this.props.GammaWall0DTE) },
                        text: `Gamma Wall 0DTE: ${this.props.GammaWall0DTE}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('white') },
                        textAlignment: 'centerBelow'
                    },

                    this.props.GEX1 && {
                        tag: 'Text',
                        key: 'GEX1abel',
                        point: { x: du(d.index() + 1), y: du(this.props.GEX1) },
                        text: `GEX 1: ${this.props.GEX1}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('white') },
                        textAlignment: 'centerBelow'
                    },                    
                    this.props.GEX2 && {
                        tag: 'Text',
                        key: 'GEX2Label',
                        point: { x: du(d.index() + 1), y: du(this.props.GEX2) },
                        text: `GEX 2: ${this.props.GEX2}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('white') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.GEX3 && {
                        tag: 'Text',
                        key: 'GEX3Label',
                        point: { x: du(d.index() + 1), y: du(this.props.GEX3) },
                        text: `GEX 3: ${this.props.GEX3}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('lime') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.GEX4 && {
                        tag: 'Text',
                        key: 'GEX4Label',
                        point: { x: du(d.index() + 1), y: du(this.props.GEX4) },
                        text: `GEX 4: ${this.props.GEX4}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('lime') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.GEX5 && {
                        tag: 'Text',
                        key: 'GEX5Label',
                        point: { x: du(d.index() + 1), y: du(this.props.GEX5) },
                        text: `GEX 5: ${this.props.GEX5}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('lime') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.GEX6 && {
                        tag: 'Text',
                        key: 'GEX6Label',
                        point: { x: du(d.index() + 1), y: du(this.props.GEX6) },
                        text: `GEX 6: ${this.props.GEX6}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('red') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.GEX7 && {
                        tag: 'Text',
                        key: 'SD1Label',
                        point: { x: du(d.index() + 1), y: du(this.props.GEX7) },
                        text: `GEX 7: ${this.props.GEX7}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('red') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.GEX8 && {
                        tag: 'Text',
                        key: 'GEX8Label',
                        point: { x: du(d.index() + 1), y: du(this.props.GEX8) },
                        text: `GEX 8: ${this.props.GEX8}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('red') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.GEX9 && {
                        tag: 'Text',
                        key: 'GEX9Label',
                        point: { x: du(d.index() + 1), y: du(this.props.GEX8) },
                        text: `GEX 9: ${this.props.GEX8}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('red') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.GEX10 && {
                        tag: 'Text',
                        key: 'GEX10Label',
                        point: { x: du(d.index() + 1), y: du(this.props.GEX8) },
                        text: `GEX 10: ${this.props.GEX8}`,
                        style: { fontSize: 10, fontWeight: "bold", fill: predef.paramSpecs.color('red') },
                        textAlignment: 'centerBelow'
                    },

                ].filter(Boolean)
            }: undefined
        };
    }
}

    module.exports = {
        name: "TO - MenthorQ",
        title: "TO - MenthorQ",
        description: "TO - MenthorQ",
        tags: ["TraderOracle", "MenthorQ"],
        calculator: MenthorQ,
        params: {
            CallResistance: predef.paramSpecs.number(),
            PutSupport: predef.paramSpecs.number(),

            HVL: predef.paramSpecs.number(),

            OneDMin: predef.paramSpecs.number(),
            OneDMax: predef.paramSpecs.number(),

            CallResistance0DTE: predef.paramSpecs.number(),
            PutSupport0DTE: predef.paramSpecs.number(),

            HVL0DTE: predef.paramSpecs.number(),
            GammaWall0DTE: predef.paramSpecs.number(),

            GEX1: predef.paramSpecs.number(),
            GEX2: predef.paramSpecs.number(),
            GEX3: predef.paramSpecs.number(),
            GEX4: predef.paramSpecs.number(),
            GEX5: predef.paramSpecs.number(),
            GEX6: predef.paramSpecs.number(),
            GEX7: predef.paramSpecs.number(),
            GEX8: predef.paramSpecs.number(),
            GEX9: predef.paramSpecs.number(),
            GEX10: predef.paramSpecs.number(),
        },
        plots: {
            CallResistance: { title: "Call Resistance" },
            PutSupport: { title: "Put Support" },
            HVL: { title: "HVL" },
            OneDMin: { title: "1D Min" },
            OneDMax: { title: "1D Max" },
            CallResistance0DTE: { title: "Call Resistance 0DTE" },
            PutSupport0DTE: { title: "Put Support 0DTE" },
            HVL0DTE: { title: "HVL 0DTE" },
            GammaWall0DTE: { title: "Gamma Wall 0DTE" },

            GEX1: { title: "GEX 1" },
            GEX2: { title: "GEX 2" },
            GEX3: { title: "GEX 3" },
            GEX4: { title: "GEX 4" },
            GEX5: { title: "GEX 5" },
            GEX6: { title: "GEX 6" },
            GEX7: { title: "GEX 7" },
            GEX8: { title: "GEX 8" },
            GEX9: { title: "GEX 9" },
            GEX10: { title: "GEX 10" },
        },
        tags: ["TraderOracle"],
        schemeStyles: {
            dark: {
                CallResistance: predef.styles.plot({ lineWidth: 3, color: "#ff0000", opacity: 80, lineStyle: 5 }),
                PutSupport: predef.styles.plot({ lineWidth: 3, color: "#00ff55", opacity: 80, lineStyle: 3 }),
                HVL: predef.styles.plot({ lineWidth: 3, color: "#f0df26", opacity: 80, lineStyle: 3 }),
                OneDMin: predef.styles.plot({ color: "#b5ffd4", opacity: 100, lineStyle: 1 }),
                OneDMax: predef.styles.plot({ color: "#b5ffd4", opacity: 100, lineStyle: 1 }),
                CallResistance0DTE: predef.styles.plot({ color: "#fc9292", opacity: 100, lineStyle: 1 }),
                PutSupport0DTE: predef.styles.plot({ color: "#fc9292", opacity: 100, lineStyle: 1 }),
                HVL0DTE: predef.styles.plot({ color: "#ff0000", opacity: 100, lineStyle: 4 }),
                GammaWall0DTE: predef.styles.plot({ color: "#00ff55", opacity: 100, lineStyle: 4 }),
                GEX1: predef.styles.plot({ lineWidth: 3, color: "#00ff55", opacity: 100, lineStyle: 2 }),
                GEX2: predef.styles.plot({ lineWidth: 3, color: "#ff0000", opacity: 100, lineStyle: 2 }),
                GEX3: predef.styles.plot({ color: "#00ff55", opacity: 100, lineStyle: 5 }),
                GEX4: predef.styles.plot({ color: "#00ff55", opacity: 100, lineStyle: 5 }),
                GEX5: predef.styles.plot({ color: "#00ff55", opacity: 100, lineStyle: 5 }),
                GEX6: predef.styles.plot({ color: "#ff0000", opacity: 100, lineStyle: 5 }),
                GEX7: predef.styles.plot({ color: "#ff0000", opacity: 100, lineStyle: 5 }),
                GEX8: predef.styles.plot({ color: "#ff0000", opacity: 100, lineStyle: 5 }),
                GEX9: predef.styles.plot({ color: "#ff0000", opacity: 100, lineStyle: 5 }),
                GEX10: predef.styles.plot({ color: "#ff0000", opacity: 100, lineStyle: 5 }),
            }
        }
};