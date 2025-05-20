const predef = require('./tools/predef');
const meta = require('./tools/meta');
const { ParamType } = meta;

function number(defValue, step, min) {
  return {
    type: ParamType.NUMBER,
    def: defValue,
    restrictions: {
      step: step || 1,
      min: min > 0 ? min : 0,
    },
  };
}

class tikiIVLevels {
  init() {
    this.tradeDate = 0;
  }

  map(d, i, history) {
    if (d.tradeDate) {
      const type = this.props.type;
      const tradeDate = d.tradeDate();
      if (type === 'chart') {
        if (tradeDate !== this.tradeDate) {
          this.tradeDate = tradeDate;
          this.open = d.open();
          this.stdDev = (this.props.iv / 100) * this.open * Math.sqrt(this.props.days / 252);
        }
      } else if (type === 'session') {
        const timestamp = d.timestamp();
        const hour = timestamp.getHours();
        const minute = timestamp.getMinutes();
        const startHour = this.props.sessionHour;
        const startMinute = this.props.sessionMinute;

        if (history.prior()) {
          const priorTimestamp = history.prior().timestamp();
          const priorHour = priorTimestamp.getHours();
          const priorMinute = priorTimestamp.getMinutes();

          // Hacky way to help tick charts work.
          const startTime = +('' + startHour + (startMinute < 10 ? '0' : '') + startMinute);
          const priorTime = +('' + priorHour + (priorMinute < 10 ? '0' : '') + priorMinute);
          const time = +('' + hour + (minute < 10 ? '0' : '') + minute);

          if (priorTime < startTime && time >= startTime) {
            this.tradeDate = tradeDate;
            this.open = d.open();
            this.stdDev = (this.props.iv / 100) * this.open * Math.sqrt(this.props.days / 252);
          }
        }
      }

      const open = this.open;
      const stdDev = this.stdDev;
      const step = this.props.devStep;

      const upper1 = open + stdDev * step;
      const lower1 = open - stdDev * step;
      const upper2 = open + stdDev * step * 2;
      const lower2 = open - stdDev * step * 2;
      const upper3 = open + stdDev * step * 3;
      const lower3 = open - stdDev * step * 3;
      const upper4 = open + stdDev * step * 4;
      const lower4 = open - stdDev * step * 4;
      const upper5 = open + stdDev * step * 5;
      const lower5 = open - stdDev * step * 5;
      const upper6 = open + stdDev * step * 6;
      const lower6 = open - stdDev * step * 6;

      return {
        upper6,
        upper5,
        upper4,
        upper3,
        upper2,
        upper1,
        open,
        lower1,
        lower2,
        lower3,
        lower4,
        lower5,
        lower6,
      };
    }
  }
}

module.exports = {
  name: 'tikiIVLevels',
  description: 'Tiki IV Levels',
  calculator: tikiIVLevels,
  inputType: meta.InputType.BARS,
  tags: ['Tikitrade 🏝️ Try tikitrade.com'],
  params: {
    iv: number(15, 0.01, 1),
    days: number(1, 1, 1),
    devStep: number(0.25, 0.25, 0.25),
    type: predef.paramSpecs.enum(
      {
        chart: 'Chart',
        session: 'Session',
      },
      'chart'
    ),
    sessionHour: number(9, 1, 0),
    sessionMinute: number(30, 1, 0),
  },
  plots: {
    open: { title: 'Std Dev' },
    upper1: { title: 'Std Dev Upper 1' },
    lower1: { title: 'Std Dev Lower 1' },
    upper2: { title: 'Std Dev Upper 2' },
    lower2: { title: 'Std Dev Lower 2' },
    upper3: { title: 'Std Dev Upper 3' },
    lower3: { title: 'Std Dev Lower 3' },
    upper4: { title: 'Std Dev Upper 4' },
    lower4: { title: 'Std Dev Lower 4' },
    upper5: { title: 'Std Dev Upper 5' },
    lower5: { title: 'Std Dev Lower 5' },
    upper6: { title: 'Std Dev Upper 6' },
    lower6: { title: 'Std Dev Lower 6' },
  },
  schemeStyles: {
    dark: {
      open: predef.styles.plot({ color: 'yellow', lineStyle: 1 }),
      upper1: predef.styles.plot({ color: 'red', lineStyle: 3, lineWidth: 1 }),
      lower1: predef.styles.plot({ color: 'green', lineStyle: 3, lineWidth: 1 }),
      upper2: predef.styles.plot({ color: 'red', lineStyle: 1, lineWidth: 1 }),
      lower2: predef.styles.plot({ color: 'green', lineStyle: 1, lineWidth: 1 }),
      upper3: predef.styles.plot({ color: 'red', lineStyle: 3, lineWidth: 1 }),
      lower3: predef.styles.plot({ color: 'green', lineStyle: 3, lineWidth: 1 }),
      upper4: predef.styles.plot({ color: 'red', lineStyle: 1, lineWidth: 1 }),
      lower4: predef.styles.plot({ color: 'green', lineStyle: 1, lineWidth: 1 }),
      upper5: predef.styles.plot({ color: 'red', lineStyle: 3, lineWidth: 1 }),
      lower5: predef.styles.plot({ color: 'green', lineStyle: 3, lineWidth: 1 }),
      upper6: predef.styles.plot({ color: 'red', lineStyle: 1, lineWidth: 1 }),
      lower6: predef.styles.plot({ color: 'green', lineStyle: 1, lineWidth: 1 }),
    },
  },
};
