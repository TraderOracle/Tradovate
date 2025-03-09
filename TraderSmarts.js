const predef = require("./tools/predef");
const meta = require("./tools/meta");
const { px, du } = require("./tools/graphics");

class TraderSmarts {
    init() {
        this.ExtremeLong = undefined;
        this.ExtremeLong2 = undefined;
        this.HOLong = undefined;
        this.HOLong2 = undefined;
        this.RangeLong = undefined;
        this.RangeLong2 = undefined;

        this.LIS = undefined;
        this.LIS2 = undefined;

        this.RangeShort = undefined;
        this.RangeShort2 = undefined;
        this.HOShort = undefined;
        this.HOShort2 = undefined;
        this.ExtremeShort = undefined;
        this.ExtremeShort2 = undefined;
    }

    map(d) {
        return {
            ExtremeShort: this.props.ExtremeShort,
            ExtremeShort2: this.props.ExtremeShort2,
            HOShort: this.props.HOShort,
            HOShort2: this.props.HOShort2,
            RangeShort: this.props.RangeShort,
            RangeShort2: this.props.RangeShort2,
            LIS: this.props.LIS,
            LIS2: this.props.LIS2,
            RangeLong: this.props.RangeLong,
            RangeLong2: this.props.RangeLong2,
            HOLong: this.props.HOLong,
            HOLong2: this.props.HOLong2,
            ExtremeLong: this.props.ExtremeLong,
            ExtremeLong2: this.props.ExtremeLong2,
            graphics: d.isLast() ? {
                items: [
                    this.props.ExtremeLong && {
                        tag: 'Text',
                        key: 'ExtremeLongLabel',
                        point: { x: du(d.index() + 1), y: du(this.props.ExtremeLong) },
                        text: `Extreme Long: ${this.props.ExtremeLong}`,
                        style: { fontSize: 12, fontWeight: "bold", fill: predef.paramSpecs.color('lime') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.ExtremeLong2 && {
                        tag: 'Text',
                        key: 'ExtremeLong2Label',
                        point: { x: du(d.index() + 1), y: du(this.props.ExtremeLong2) },
                        text: `Extreme Long: ${this.props.ExtremeLong2}`,
                        style: { fontSize: 12, fontWeight: "bold", fill: predef.paramSpecs.color('lime') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.HOLong && {
                        tag: 'Text',
                        key: 'HOLongLabel',
                        point: { x: du(d.index() + 1), y: du(this.props.HOLong) },
                        text: `Highest Odds Long: ${this.props.HOLong}`,
                        style: { fontSize: 12, fontWeight: "bold", fill: predef.paramSpecs.color('white') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.HOLong2 && {
                        tag: 'Text',
                        key: 'HOLongLabel2',
                        point: { x: du(d.index() + 1), y: du(this.props.HOLong2) },
                        text: `Highest Odds Long: ${this.props.HOLong2}`,
                        style: { fontSize: 12, fontWeight: "bold", fill: predef.paramSpecs.color('white') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.RangeLong && {
                        tag: 'Text',
                        key: 'RangeLongLabel',
                        point: { x: du(d.index() + 1), y: du(this.props.RangeLong) },
                        text: `Range Long: ${this.props.RangeLong}`,
                        style: { fontSize: 12, fontWeight: "bold", fill: predef.paramSpecs.color('red') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.RangeLong2 && {
                        tag: 'Text',
                        key: 'RangeLong2Label',
                        point: { x: du(d.index() + 1), y: du(this.props.RangeLong2) },
                        text: `Range Long: ${this.props.RangeLong2}`,
                        style: { fontSize: 12, fontWeight: "bold", fill: predef.paramSpecs.color('white') },
                        textAlignment: 'centerBelow'
                    },      
                    
                    this.props.LIS && {
                        tag: 'Text',
                        key: 'LISLabel',
                        point: { x: du(d.index() + 1), y: du(this.props.LIS) },
                        text: `Line In The Sand: ${this.props.LIS}`,
                        style: { fontSize: 12, fontWeight: "bold", fill: predef.paramSpecs.color('red') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.LIS2 && {
                        tag: 'Text',
                        key: 'LIS2Label',
                        point: { x: du(d.index() + 1), y: du(this.props.LIS2) },
                        text: `Line In The Sand: ${this.props.LIS2}`,
                        style: { fontSize: 12, fontWeight: "bold", fill: predef.paramSpecs.color('red') },
                        textAlignment: 'centerBelow'
                    },

                    this.props.RangeShort && {
                        tag: 'Text',
                        key: 'RangeShort',
                        point: { x: du(d.index() + 1), y: du(this.props.RangeShort) },
                        text: `Range Short: ${this.props.RangeShort}`,
                        style: { fontSize: 12, fontWeight: "bold", fill: predef.paramSpecs.color('white') },
                        textAlignment: 'centerBelow'
                    },      
                    this.props.RangeShort2 && {
                        tag: 'Text',
                        key: 'RangeShortabel',
                        point: { x: du(d.index() + 1), y: du(this.props.RangeShort2) },
                        text: `Range Short: ${this.props.RangeShort2}`,
                        style: { fontSize: 12, fontWeight: "bold", fill: predef.paramSpecs.color('white') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.HOShort && {
                        tag: 'Text',
                        key: 'HOShortLabel',
                        point: { x: du(d.index() + 1), y: du(this.props.HOShort) },
                        text: `Highest Odds Short: ${this.props.HOShort}`,
                        style: { fontSize: 12, fontWeight: "bold", fill: predef.paramSpecs.color('white') },
                        textAlignment: 'centerAbove'
                    },
                    this.props.HOShort2 && {
                        tag: 'Text',
                        key: 'HOShort2Label',
                        point: { x: du(d.index() + 1), y: du(this.props.HOShort2) },
                        text: `Highest Odds Short: ${this.props.HOShort2}`,
                        style: { fontSize: 12, fontWeight: "bold", fill: predef.paramSpecs.color('red') },
                        textAlignment: 'centerBelow'
                    },
                    this.props.ExtremeShort && {
                        tag: 'Text',
                        key: 'ExtremeShortLabel',
                        point: { x: du(d.index() + 1), y: du(this.props.ExtremeShort) },
                        text: `Extreme Short: ${this.props.ExtremeShort}`,
                        style: { fontSize: 12, fontWeight: "bold", fill: predef.paramSpecs.color('white') },
                        textAlignment: 'centerBelow'
                    },                    
                    this.props.ExtremeShort2 && {
                        tag: 'Text',
                        key: 'ExtremeShort2Label',
                        point: { x: du(d.index() + 1), y: du(this.props.ExtremeShort2) },
                        text: `Extreme Short: ${this.props.ExtremeShort2}`,
                        style: { fontSize: 12, fontWeight: "bold", fill: predef.paramSpecs.color('white') },
                        textAlignment: 'centerBelow'
                    }      
                ].filter(Boolean)
            }: undefined
        };
    }
}

    module.exports = {
        name: "TO - TraderSmarts",
        title: "TO - TraderSmarts",
        description: "TO - TraderSmarts",
        tags: ["TraderOracle","TraderSmarts"],
        calculator: TraderSmarts,
        params: {
            ExtremeShort: predef.paramSpecs.number(),
            ExtremeShort2: predef.paramSpecs.number(),

            HOShort: predef.paramSpecs.number(),
            HOShort2: predef.paramSpecs.number(),

            RangeShort: predef.paramSpecs.number(),
            RangeShort2: predef.paramSpecs.number(),

            LIS: predef.paramSpecs.number(),
            LIS2: predef.paramSpecs.number(),

            RangeLong: predef.paramSpecs.number(),
            RangeLong2: predef.paramSpecs.number(),

            HOLong: predef.paramSpecs.number(),
            HOLong2: predef.paramSpecs.number(),

            ExtremeLong: predef.paramSpecs.number(),
            ExtremeLong2: predef.paramSpecs.number(),
        },
        plots: {
            RangeShort: { title: "Range Short" },
            RangeShort2: { title: "Range Short" },
            ExtremeShort: { title: "Extreme Short" },
            ExtremeShort2: { title: "Extreme Short" },
            HOShort: { title: "Highest Odds Short" },
            HOShort2: { title: "Highest Odds Short" },
            LIS: { title: "Line in the Sand" },
            LIS2: { title: "Line in the Sand" },
            RangeLong: { title: "Range Long" },
            RangeLong2: { title: "Range Long" },
            HOLong: { title: "Highest Odds Long" },
            HOLong2: { title: "Highest Odds Long" },
            ExtremeLong: { title: "Extreme Long" },
            ExtremeLong2: { title: "Extreme Long" }
        },
        tags: ["TraderOracle"],
        schemeStyles: {
            dark: {
                ExtremeShort: predef.styles.plot({ lineWidth: 1, color: "#ff0000", opacity: 100, lineStyle: 5 }),
                ExtremeShort2: predef.styles.plot({ lineWidth: 1, color: "#ff0000", opacity: 100, lineStyle: 5 }),
                RangeShort: predef.styles.plot({ lineWidth: 1, color: "#ff0000", opacity: 100, lineStyle: 5 }),
                RangeShort2: predef.styles.plot({ lineWidth: 1, color: "#ff0000", opacity: 100, lineStyle: 5 }),
                HOShort: predef.styles.plot({ lineWidth: 2, color: "#ff0000", opacity: 100, lineStyle: 5 }),
                HOShort2: predef.styles.plot({ lineWidth: 2, color: "#ff0000", opacity: 100, lineStyle: 5 }),
                LIS: predef.styles.plot({ lineWidth: 3, color: "#ffc800", opacity: 100, lineStyle: 5 }),
                LIS2: predef.styles.plot({ lineWidth: 3, color: "#ffc800", opacity: 100, lineStyle: 5 }),
                RangeLong: predef.styles.plot({ lineWidth: 1, color: "#2bff00", opacity: 100, lineStyle: 5 }),
                RangeLong2: predef.styles.plot({ lineWidth: 1, color: "#2bff00", opacity: 100, lineStyle: 5 }),
                HOLong: predef.styles.plot({ lineWidth: 2, color: "#2bff00", opacity: 100, lineStyle: 5 }),
                HOLong2: predef.styles.plot({ lineWidth: 2, color: "#2bff00", opacity: 100, lineStyle: 5}),
                ExtremeLong: predef.styles.plot({ lineWidth: 1, color: "#2bff00", opacity: 100, lineStyle: 5 }),
                ExtremeLong2: predef.styles.plot({ lineWidth: 1, color: "#2bff00", opacity: 100, lineStyle: 5 }),
            }
        }
};