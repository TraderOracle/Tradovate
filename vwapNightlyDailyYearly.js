const predef = require("./tools/predef");
const meta = require("./tools/meta");
const typicalPrice = require("./tools/typicalPrice");

class MultiPeriodVWAP {
    init() {
        this.yearlyAnchor = this.createAnchor();
        this.monthlyAnchor = this.createAnchor();
        this.weeklyAnchor = this.createAnchor();
        this.dailyAnchor = this.createAnchor();
        this.futuresOpenAnchor = this.createAnchor();

        this.currentYear = null;
        this.currentMonth = null;
        this.currentWeek = null;
        this.currentDay = null;
        this.currentFuturesOpen = null;
    }

    createAnchor() {
        return {
            high: null,
            low: null,
            volumeSum: 0,
            volumePriceSum: 0
        };
    }

    resetAnchor(anchor) {
        anchor.high = null;
        anchor.low = null;
        anchor.volumeSum = 0;
        anchor.volumePriceSum = 0;
    }

    updateAnchor(anchor, high, low, vol, tPrice) {
        if (anchor.high === null || high > anchor.high) {
            anchor.high = high;
        }
        if (anchor.low === null || low < anchor.low) {
            anchor.low = low;
        }
        anchor.volumeSum += vol;
        anchor.volumePriceSum += vol * tPrice;
    }

    calculateVWAP(anchor) {
        return anchor.volumePriceSum / anchor.volumeSum;
    }

    map(d, i, history) {
        const timestamp = d.timestamp();
        const year = timestamp.getFullYear();
        const month = timestamp.getMonth();
        const day = timestamp.getDay();
        const date = timestamp.getDate();
        const hour = timestamp.getHours();
        const minute = timestamp.getMinutes();
        const high = d.high();
        const low = d.low();
        const open = d.open();
        const close = d.close();
        const vol = d.volume();
        const tPrice = (high + low + open + close) / 4;
        const nycOffset = -5; // NYC is UTC-5 (Standard Time), adjust if Daylight Saving Time is considered

        // Convert timestamp to NYC time
        const nycTimestamp = new Date(timestamp.getTime() + nycOffset * 60 * 60 * 1000);
        const nycHour = nycTimestamp.getUTCHours();
        const nycMinute = nycTimestamp.getUTCMinutes();
        const nycSessionTime = nycHour * 100 + nycMinute;
        const nycDate = nycTimestamp.getUTCDate();

        // Reset yearly anchor at the start of each year
        if (this.currentYear !== year) {
            this.currentYear = year;
            this.resetAnchor(this.yearlyAnchor);
        }
        // Reset monthly anchor at the start of each month
        if (this.currentMonth !== month) {
            this.currentMonth = month;
            this.resetAnchor(this.monthlyAnchor);
        }
        // Reset weekly anchor at 6:00 PM Sunday (start of the week)
        if (day === 0 && nycSessionTime >= 1800 && this.currentWeek !== date) {
            this.currentWeek = date;
            this.resetAnchor(this.weeklyAnchor);
        }
        // Reset daily anchor at 9:30 AM NYC time
        if (nycSessionTime >= 930 && this.currentDay !== nycDate) {
            this.currentDay = nycDate;
            this.resetAnchor(this.dailyAnchor);
        }
        // Reset futures open anchor at 6:00 PM NYC time
        if (nycSessionTime >= 1800 && this.currentFuturesOpen !== date) {
            this.currentFuturesOpen = date;
            this.resetAnchor(this.futuresOpenAnchor);
        }

        // Update anchors
        this.updateAnchor(this.yearlyAnchor, high, low, vol, tPrice);
        this.updateAnchor(this.monthlyAnchor, high, low, vol, tPrice);
        this.updateAnchor(this.weeklyAnchor, high, low, vol, tPrice);
        this.updateAnchor(this.dailyAnchor, high, low, vol, tPrice);
        this.updateAnchor(this.futuresOpenAnchor, high, low, vol, tPrice);

        // VWAP Calculation
        const vwapYearly = this.calculateVWAP(this.yearlyAnchor);
        const vwapMonthly = this.calculateVWAP(this.monthlyAnchor);
        const vwapWeekly = this.calculateVWAP(this.weeklyAnchor);
        const vwapDaily = this.calculateVWAP(this.dailyAnchor);
        const vwapFuturesOpen = this.calculateVWAP(this.futuresOpenAnchor);

        return {
            vwapYearly: vwapYearly,
            vwapMonthly: vwapMonthly,
            vwapWeekly: vwapWeekly,
            vwapDaily: vwapDaily,
            vwapFuturesOpen: vwapFuturesOpen
        };
    }

    filter() {
        return true; // Always return true to ensure data is processed
    }
}

module.exports = {
    name: "MultiPeriodVWAP",
    description: "Anchored VWAPs with various anchoring periods (yearly, monthly, weekly, daily, futures open).",
    calculator: MultiPeriodVWAP,
    inputType: meta.InputType.BARS,
    plots: {
        vwapYearly: { title: "VWAP Yearly" },
        vwapMonthly: { title: "VWAP Monthly" },
        vwapWeekly: { title: "VWAP Weekly" },
        vwapDaily: { title: "VWAP Daily" },
        vwapFuturesOpen: { title: "VWAP Futures Open" },
    },
    plotter: [
        predef.plotters.singleline("vwapYearly"),
        predef.plotters.singleline("vwapMonthly"),
        predef.plotters.singleline("vwapWeekly"),
        predef.plotters.singleline("vwapDaily"),
        predef.plotters.singleline("vwapFuturesOpen")
    ],
    schemeStyles: {
        dark: {
            vwapYearly: predef.styles.plot({
                color: "#00FFFF", // Aqua
                lineWidth: 2
            }),
            vwapMonthly: predef.styles.plot({
                color: "#FF00FF", // Magenta
                lineWidth: 2
            }),
            vwapWeekly: predef.styles.plot({
                color: "#FFFF00", // Yellow
                lineWidth: 2
            }),
            vwapDaily: predef.styles.plot({
                color: "#FF0000", // Red
                lineWidth: 2
            }),
            vwapFuturesOpen: predef.styles.plot({
                color: "#0000FF", // Blue
                lineWidth: 2
            })
        }
    },
    inputType: meta.InputType.BARS,
    tags: ['ServantThought Tools']
};