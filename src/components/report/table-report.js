import { useContext, useEffect, useState } from "react";
import { homeContext } from "../../provider/home.provider";

const TableReport = () => {
  // fetching data from homeContext
  const { rateHistory } = useContext(homeContext);
  // initializing records state
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const history = Object.keys(rateHistory)
      .map((date) => ({ date, rate: rateHistory[date] }))
      .reverse();

    // setting records state
    setRecords(history);
  }, [rateHistory]);

  return (
    <table className="table mt-auto mb-0">
      <thead>
        <tr>
          <th className="col-6">Date</th>
          <th className="col-6">Exchange Rate</th>
        </tr>
      </thead>
      <tbody>
        {records.length ? (
          records.map(({ date, rate }) => (
            <tr key={date}>
              <td>{date}</td>
              <td>{rate}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="text-center" colSpan="2">
              ---
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableReport;
