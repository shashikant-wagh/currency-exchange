import { homeContext } from "../provider/home.provider";
import { useContext, useEffect, useState } from "react";
import ExchangeSummary from "../classes/exchange-summary";

const ExchangeStats = () => {
  const { rateHistory } = useContext(homeContext);
  const [rateSummary, setRateSummary] = useState({});

  useEffect(() => {
    setRateSummary({ ...new ExchangeSummary(rateHistory) });
  }, [rateHistory]);

  return (
    <table className="table mt-auto mb-0">
      <thead>
        <tr>
          <th className="col-8">Statistic</th>
          <th className="col-4"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Lowest</td>
          <td className="text-end">{rateSummary.smallest}</td>
        </tr>
        <tr>
          <td>Highest</td>
          <td className="text-end">{rateSummary.highest}</td>
        </tr>
        <tr>
          <td>Average</td>
          <td className="text-end">{rateSummary.average}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ExchangeStats;
