import { useContext } from "react";
import { homeContext } from "../provider/home.provider";

const ExchangeDetails = () => {
  // fetching data from homeContext
  const {
    formData: { conversionRate, amount, from, to },
  } = useContext(homeContext);

  // generating readable price
  const getReadablePrice = (price) => {
    let redableNumber = price.toLocaleString();
    return !Number(redableNumber) ? price : redableNumber;
  };

  return conversionRate ? (
    <div className="mt-5 text-center">
      <div className="page-title">
        <span className="fw-light">
          {getReadablePrice(amount)} {from} ={" "}
        </span>
        <span className="text-accent page-heading">
          {getReadablePrice(amount * conversionRate)} {to}
        </span>
      </div>

      <div className="section-title fw-light">
        <div>
          1 {from} = {getReadablePrice(conversionRate)} {to}
        </div>
        <div>
          1 {to} = {getReadablePrice(1 / conversionRate)} {from}
        </div>
      </div>
    </div>
  ) : null;
};

export default ExchangeDetails;
