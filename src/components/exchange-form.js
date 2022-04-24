import { formatDate } from "../utils/date.utils";
import { useContext, useEffect, useState } from "react";
import { homeContext } from "../provider/home.provider";

const ExchangeForm = () => {
  // initializing option state
  const [options, setOptions] = useState([]);
  // fetching data from homeContext
  const { formData, handleChange, setFormData } = useContext(homeContext);

  const getPageTitle = () => {
    // page not showing historical data
    if (!formData.historical) {
      return "I want to convert";
    }

    // page showing historical data
    const date = formatDate(new Date(formData.end_date), true);
    return `Exchange rate on ${date}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // trigger requst by setting submitted to true
    setFormData((prevState) => ({ ...prevState, submitted: true }));
  };

  useEffect(() => {
    const fetchOptions = async () => {
      if (options.length) return;

      let currencyOptions = [];
      // looking into localStorage if it already have currencies
      const currencies = localStorage.getItem("currencies");

      if (currencies) {
        // using currencies from localStorage
        currencyOptions = JSON.parse(currencies);
      } else {
        // making request to get currencies
        const response = await fetch("https://api.exchangerate.host/latest");
        const { rates } = await response.json();
        currencyOptions = Object.keys(rates);

        // setting currencies in localStorage
        localStorage.setItem("currencies", JSON.stringify(currencyOptions));
      }

      setOptions(currencyOptions);
    };

    fetchOptions();
  }, [options]);

  return (
    <form onSubmit={handleSubmit}>
      <p className="page-title">{getPageTitle()}</p>

      <div className="row mt-3 gx-3 gy-2 align-items-center">
        <div className="col-md-3">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            className="form-control"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-7">
          <div className="row">
            <div className="col-5">
              <label htmlFor="from">From</label>
              <select
                required
                id="from"
                name="from"
                className="form-select"
                value={formData.from}
                onChange={handleChange}
              >
                <option value="">Choose...</option>
                {options.map((option) => {
                  return option === formData.to ? null : (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-auto mt-auto mb-0">
              <span className="btn btn-outline-secondary disabled bg-white border-secondary">
                <span className="material-icons text-primary align-bottom">
                  compare_arrows
                </span>
              </span>
            </div>
            <div className="col-5">
              <label htmlFor="to">To</label>
              <select
                required
                id="to"
                name="to"
                className="form-select"
                value={formData.to}
                onChange={handleChange}
              >
                <option value="">Choose...</option>
                {options.map((option) => {
                  return option === formData.from ? null : (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="col-md-2  mt-md-auto mb-md-0 mt-sm-3">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={formData.conversionRate}
          >
            Convert
          </button>
        </div>
      </div>
    </form>
  );
};

export default ExchangeForm;
