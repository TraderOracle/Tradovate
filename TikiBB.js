const predef = require('./tools/predef');
const StdDev = require('./tools/StdDev');

class tikiBollingerBands1 {
  init() {
    this.stdDev = StdDev(this.props.period);
  }

  map(d) {
    const stdev = this.stdDev(d.value());
    const avg = this.stdDev.avg();
    const halfWidth = stdev * this.props.deviation;
    const lowerBand = avg - halfWidth;
    return {
      upper: avg + halfWidth,
      middle: avg,
      lower: lowerBand,
    };
  }

  filter(d, i) {
    return i > this.props.period;
  }
}

module.exports = {
  name: 'tikiBollingerBands1',
  description: 'Tiki Bollinger Bands v1',
  calculator: tikiBollingerBands1,
  params: {
    period: predef.paramSpecs.period(20),
    deviation: predef.paramSpecs.number(2, 0.01, 0.01),
  },
  plots: {
    middle: { title: 'Middle Band' },
    upper: { title: 'Upper Band' },
    lower: { title: 'Lower Band' },
  },
  tags: ['Tikitrade 🏝️ Try tikitrade.com'],
  schemeStyles: {
    dark: {
      middle: predef.styles.plot({
        color: '#ffa44f',
        lineStyle: 3,
        lineWidth: 2,
      }),
      upper: predef.styles.plot({
        color: '#b2001e',
        lineStyle: 1,
        lineWidth: 2,
      }),
      lower: predef.styles.plot({
        color: '#35a24a',
        lineStyle: 1,
        lineWidth: 2,
      }),
    },
  },
};
