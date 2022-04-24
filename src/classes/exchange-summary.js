class ExchangeSummary {
  constructor(rateHistory) {
    let rates = ExchangeSummary.getRates(rateHistory);

    this.smallest = ExchangeSummary.getSmallest(rates);
    this.highest = ExchangeSummary.getHighest(rates);
    this.average = ExchangeSummary.getAverage(rates);
  }

  static getRates(rateHistory) {
    return Object.values(rateHistory);
  }

  static getSmallest(rates) {
    return rates.length ? Math.min(...rates) : "--";
  }

  static getHighest(rates) {
    return rates.length ? Math.max(...rates) : "--";
  }

  static getAverage(rates) {
    if (!rates.length) return "--";

    return (
      rates.reduce((total, rate) => total + rate, 0) / rates.length
    ).toFixed(6);
  }
}

export default ExchangeSummary;
