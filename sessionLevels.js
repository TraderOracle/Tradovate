/**
 * Combined Session Levels
 * 
 * This is a modified version inspired by Emansenpai's overnight code. It calculates the session high and low for Asia, London, 
 * Pre-market Data, and the Initial Balance range. Additionally, it calculates the new initial balance and midpoint for the NYC 
 * opening range session. Line colors and thickness are customizable.
 */
const predef = require("./tools/predef");
const meta = require("./tools/meta");
const { px, du } = require("./tools/graphics");

class CombinedSessionLevels {
    init() {
        this.isAsiaSession = false;
        this.isLondonSession = false;
        this.isPreMarketSession = false;
        this.isMarketOpenSession = false;
        this.isOpeningRange = false;
        this.asiaHigh = null;
        this.asiaLow = null;
        this.londonHigh = null;
        this.londonLow = null;
        this.preMarketHigh = null;
        this.preMarketLow = null;
        this.marketOpenHigh = null;
        this.marketOpenLow = null;
        this.marketOpenMid = null;
        this.openingRangeHigh = null;
        this.openingRangeLow = null;
        this.labelOffset = 0; // Offset to prevent label overlap only when levels are equal
    }

    map(d, i, history) {
        const timestamp = d.timestamp();
        const hour = timestamp.getHours();
        const minute = timestamp.getMinutes();

        const high = d.high();
        const low = d.low();

        const time = +('' + hour + (minute < 10 ? '0' : '') + minute);

        const asiaStartTime = 1800; // 6:00 PM
        const asiaEndTime = 330;    // 3:30 AM
        const londonStartTime = 330;  // 3:30 AM
        const londonEndTime = 1000;   // 10:00 AM
        const preMarketStartTime = 830; // 8:30 AM
        const preMarketEndTime = 930;   // 9:30 AM
        const marketOpenStartTime = 930; // 9:30 AM
        const marketOpenEndTime = 1030;  // 10:30 AM
        const openingRangeEndTime = 945; // 9:45 AM

        // Asia Session Logic
        if (time >= asiaStartTime || time < asiaEndTime) {
            if (!this.isAsiaSession) {
                this.asiaHigh = high;
                this.asiaLow = low;
                this.isAsiaSession = true;
            } else {
                if (high > this.asiaHigh) this.asiaHigh = high;
                if (low < this.asiaLow) this.asiaLow = low;
            }
        } else {
            this.isAsiaSession = false;
        }

        // London Session Logic
        if (time >= londonStartTime && time <= londonEndTime) {
            if (!this.isLondonSession) {
                this.londonHigh = high;
                this.londonLow = low;
                this.isLondonSession = true;
            } else {
                if (high > this.londonHigh) this.londonHigh = high;
                if (low < this.londonLow) this.londonLow = low;
            }
        } else {
            this.isLondonSession = false;
        }

        // Pre-market Data Session Logic
        if (time >= preMarketStartTime && time <= preMarketEndTime) {
            if (!this.isPreMarketSession) {
                this.preMarketHigh = high;
                this.preMarketLow = low;
                this.isPreMarketSession = true;
            } else {
                if (high > this.preMarketHigh) this.preMarketHigh = high;
                if (low < this.preMarketLow) this.preMarketLow = low;
            }
        } else {
            this.isPreMarketSession = false;
        }

        // Initial Balance Session Logic (9:30 to 10:30)
        if (time >= marketOpenStartTime && time <= marketOpenEndTime) {
            if (!this.isMarketOpenSession) {
                this.marketOpenHigh = high;
                this.marketOpenLow = low;
                this.isMarketOpenSession = true;
            } else {
                if (high > this.marketOpenHigh) this.marketOpenHigh = high;
                if (low < this.marketOpenLow) this.marketOpenLow = low;
            }
            this.marketOpenMid = (this.marketOpenHigh + this.marketOpenLow) / 2;
        } else {
            this.isMarketOpenSession = false;
        }

        // NYC Opening Range Logic (9:30 AM to 9:45 AM)
        if (time >= marketOpenStartTime && time <= openingRangeEndTime) {
            if (!this.isOpeningRange) {
                this.openingRangeHigh = high;
                this.openingRangeLow = low;
                this.isOpeningRange = true;
            } else {
                if (high > this.openingRangeHigh) this.openingRangeHigh = high;
                if (low < this.openingRangeLow) this.openingRangeLow = low;
            }
        } else {
            this.isOpeningRange = false;
        }

        return {
            asiaHigh: this.asiaHigh,
            asiaLow: this.asiaLow,
            londonHigh: this.londonHigh,
            londonLow: this.londonLow,
            preMarketHigh: this.preMarketHigh,
            preMarketLow: this.preMarketLow,
            marketOpenHigh: this.marketOpenHigh,
            marketOpenLow: this.marketOpenLow,
            marketOpenMid: this.marketOpenMid,
            openingRangeHigh: this.openingRangeHigh,
            openingRangeLow: this.openingRangeLow,
            graphics: d.isLast() && this.props.showLabels ? {
                items: [
                    // Asia High and Low labels
                    this.asiaHigh && {
                        tag: 'Text',
                        key: 'AsiaHighLabel',
                        point: { x: du(d.index() + 1), y: du(this.asiaHigh + (this.asiaHigh === this.londonHigh ? this.labelOffset : 0)) },
                        text: this.props.enableLabels ? `Asia High: ${this.asiaHigh}` : undefined,
                        style: { fontSize: 10, fontWeight: "bold", fill: this.props.asiaLineColor },
                        textAlignment: 'centerAbove'
                    },
                    this.asiaLow && {
                        tag: 'Text',
                        key: 'AsiaLowLabel',
                        point: { x: du(d.index() + 1), y: du(this.asiaLow - (this.asiaLow === this.londonLow ? this.labelOffset : 0)) },
                        text: this.props.enableLabels ? `Asia Low: ${this.asiaLow}` : undefined,
                        style: { fontSize: 10, fontWeight: "bold", fill: this.props.asiaLineColor },
                        textAlignment: 'centerBelow'
                    },

                    // London High and Low labels
                    this.londonHigh && {
                        tag: 'Text',
                        key: 'LondonHighLabel',
                        point: { x: du(d.index() + 1), y: du(this.londonHigh + (this.londonHigh === this.asiaHigh ? this.labelOffset : 0)) },
                        text: this.props.enableLabels ? `London High: ${this.londonHigh}` : undefined,
                        style: { fontSize: 10, fontWeight: "bold", fill: this.props.londonLineColor },
                        textAlignment: 'centerAbove'
                    },
                    this.londonLow && {
                        tag: 'Text',
                        key: 'LondonLowLabel',
                        point: { x: du(d.index() + 1), y: du(this.londonLow - (this.londonLow === this.asiaLow ? this.labelOffset : 0)) },
                        text: this.props.enableLabels ? `London Low: ${this.londonLow}` : undefined,
                        style: { fontSize: 10, fontWeight: "bold", fill: this.props.londonLineColor },
                        textAlignment: 'centerBelow'
                    },

                    // Pre-market Data High and Low labels
                    this.preMarketHigh && {
                        tag: 'Text',
                        key: 'PreMarketHighLabel',
                        point: { x: du(d.index() + 1), y: du(this.preMarketHigh + (this.preMarketHigh === this.marketOpenHigh ? this.labelOffset : 0)) },
                        text: this.props.enableLabels ? `Pre-market Data High: ${this.preMarketHigh}` : undefined,
                        style: { fontSize: 10, fontWeight: "bold", fill: this.props.preMarketLineColor },
                        textAlignment: 'centerAbove'
                    },
                    this.preMarketLow && {
                        tag: 'Text',
                        key: 'PreMarketLowLabel',
                        point: { x: du(d.index() + 1), y: du(this.preMarketLow - (this.preMarketLow === this.marketOpenLow ? this.labelOffset : 0)) },
                        text: this.props.enableLabels ? `Pre-market Data Low: ${this.preMarketLow}` : undefined,
                        style: { fontSize: 10, fontWeight: "bold", fill: this.props.preMarketLineColor },
                        textAlignment: 'centerBelow'
                    },

                    // Initial Balance Range High, Low, and Mid labels
                    this.marketOpenHigh && {
                        tag: 'Text',
                        key: 'MarketOpenHighLabel',
                        point: { x: du(d.index() + 1), y: du(this.marketOpenHigh + (this.marketOpenHigh === this.preMarketHigh ? this.labelOffset : 0)) },
                        text: this.props.enableLabels ? `Initial Balance High: ${this.marketOpenHigh}` : undefined,
                        style: { fontSize: 10, fontWeight: "bold", fill: this.props.marketOpenLineColor },
                        textAlignment: 'centerAbove'
                    },
                    this.marketOpenLow && {
                        tag: 'Text',
                        key: 'MarketOpenLowLabel',
                        point: { x: du(d.index() + 1), y: du(this.marketOpenLow - (this.marketOpenLow === this.preMarketLow ? this.labelOffset : 0)) },
                        text: this.props.enableLabels ? `Initial Balance Low: ${this.marketOpenLow}` : undefined,
                        style: { fontSize: 10, fontWeight: "bold", fill: this.props.marketOpenLineColor },
                        textAlignment: 'centerBelow'
                    },
                    this.marketOpenMid && {
                        tag: 'Text',
                        key: 'MarketOpenMidLabel',
                        point: { x: du(d.index() + 1), y: du(this.marketOpenMid + (this.marketOpenMid === this.openingRangeHigh ? this.labelOffset : 0)) },
                        text: this.props.enableLabels ? `Initial Balance Mid: ${this.marketOpenMid}` : undefined,
                        style: { fontSize: 10, fontWeight: "bold", fill: this.props.marketOpenLineColor },
                        textAlignment: 'centerAbove'
                    },

                    // NYC Opening Range High and Low labels
                    this.openingRangeHigh && {
                        tag: 'Text',
                        key: 'OpeningRangeHighLabel',
                        point: { x: du(d.index() + 1), y: du(this.openingRangeHigh + (this.openingRangeHigh === this.marketOpenHigh || this.openingRangeHigh === this.marketOpenMid ? this.labelOffset : 0)) },
                        text: this.props.enableLabels ? `Opening Range High: ${this.openingRangeHigh}` : undefined,
                        style: { fontSize: 10, fontWeight: "bold", fill: this.props.openingRangeLineColor },
                        textAlignment: 'centerAbove'
                    },
                    this.openingRangeLow && {
                        tag: 'Text',
                        key: 'OpeningRangeLowLabel',
                        point: { x: du(d.index() + 1), y: du(this.openingRangeLow - (this.openingRangeLow === this.marketOpenLow || this.openingRangeLow === this.marketOpenMid ? this.labelOffset : 0)) },
                        text: this.props.enableLabels ? `Opening Range Low: ${this.openingRangeLow}` : undefined,
                        style: { fontSize: 10, fontWeight: "bold", fill: this.props.openingRangeLineColor },
                        textAlignment: 'centerBelow'
                    }
                ].filter(Boolean)
            } : undefined
        };
    }
}

module.exports = {
    name: "CombinedSessionLevels",
    description: "Session High and Low for Asia, London, Pre-market Data, Initial Balance, and NYC Opening Range. Additionally, it calculates the new initial balance and midpoint for the NYC opening range session.",
    calculator: CombinedSessionLevels,
    params: {
        enableLabels: predef.paramSpecs.bool(true),
        showLabels: predef.paramSpecs.bool(true),
        showLines: predef.paramSpecs.bool(true),
        asiaLineColor: predef.paramSpecs.color("#FF0000"),
        londonLineColor: predef.paramSpecs.color("#ADFF2F"),
        preMarketLineColor: predef.paramSpecs.color("#87CEEB"),
        marketOpenLineColor: predef.paramSpecs.color("#FFFFFF"),
        openingRangeLineColor: predef.paramSpecs.color("#FFD700")
    },
    plots: {
        asiaHigh: { title: "Asia High", lineWidth: 3, color: predef.paramSpecs.color() },
        asiaLow: { title: "Asia Low", lineWidth: 3, color: predef.paramSpecs.color() },
        londonHigh: { title: "London High", lineWidth: 3, color: predef.paramSpecs.color() },
        londonLow: { title: "London Low", lineWidth: 3, color: predef.paramSpecs.color() },
        preMarketHigh: { title: "Pre-market Data High", lineWidth: 3, color: predef.paramSpecs.color() },
        preMarketLow: { title: "Pre-market Data Low", lineWidth: 3, color: predef.paramSpecs.color() },
        marketOpenHigh: { title: "Initial Balance High", lineWidth: 3, color: predef.paramSpecs.color() },
        marketOpenLow: { title: "Initial Balance Low", lineWidth: 3, color: predef.paramSpecs.color() },
        marketOpenMid: { title: "Initial Balance Mid", lineWidth: 3, color: predef.paramSpecs.color() },
        openingRangeHigh: { title: "Opening Range High", lineWidth: 3, color: predef.paramSpecs.color() },
        openingRangeLow: { title: "Opening Range Low", lineWidth: 3, color: predef.paramSpecs.color() }
    },
    inputType: meta.InputType.BARS,
    tags: ['ServantThought Tools']
};