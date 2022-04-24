import { toast } from "react-toastify";
import { db } from "../utils/firebase.utils";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { formatDate, getPastDate } from "../utils/date.utils";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { createContext } from "react";
import usePrevious from "../hooks/userPrevious.hook";

export const homeContext = createContext(null);

const HomeProvider = ({ children }) => {
  // Initial formData state
  const [formData, setFormData] = useState({
    amount: 1,
    duration: 7,
    submitted: false,
    historical: false,
    conversionRate: null,
    reportFormat: "table",
    end_date: formatDate(),
  });

  // using usePrevious hook to get previous value
  const previousDuration = usePrevious(formData.duration);
  // Initial rateHistory state
  const [rateHistory, setRateHistory] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const QUERY_PARAMS = ["end_date", "to", "from", "amount"];

  // Handling onChange event on form inputs
  const handleChange = (event) => {
    // If value changed is in to or from inputs, reset rateHistory
    if (["to", "from"].includes(event.target.name)) {
      setRateHistory({});
    }

    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
      // If value changed is in to or from inputs, reset conversionRate
      conversionRate: ["to", "from"].includes(event.target.name)
        ? null
        : prevState.conversionRate,
    }));
  };

  useEffect(() => {
    const fetchRateFromHistory = async () => {
      try {
        // checking if page has query params
        const haveQueryParams = !QUERY_PARAMS.find(
          (param) => !searchParams.has(param)
        );

        // we are using either submitted value on formData or
        // query params to decide its time to make new request
        if (!haveQueryParams && !formData.submitted) return;

        // setting end_date, to, from, amount variables either from query-params or from form-data
        const [end_date, to, from, amount] = QUERY_PARAMS.map(
          (param) => searchParams.get(param) || formData[param]
        );
        const start_date = getPastDate(end_date, formData.duration - 1);

        if (!to || !from || !end_date || !amount) return;
        // making fetch request
        const response = await fetch(
          `https://api.exchangerate.host/timeseries?start_date=${start_date}&end_date=${end_date}&base=${from}&symbols=${to}`
        );
        const { rates } = await response.json();

        // normalizing response for our needs
        const history = Object.keys(rates).reduce((result, key) => {
          return { ...result, [key]: rates[key][to] };
        }, {});

        // clear query-params
        setSearchParams({});
        // set rateHistory
        setRateHistory(history);
        // set formData
        setFormData((prevState) => ({
          ...prevState,
          to,
          from,
          amount,
          end_date,
          submitted: false,
          historical: haveQueryParams,
          conversionRate: history[end_date],
        }));

        // If its a new request log it into database
        if (
          !haveQueryParams &&
          Number(previousDuration) === Number(formData.duration)
        ) {
          return await addDoc(collection(db, "history"), {
            to,
            from,
            amount,
            timestamp: serverTimestamp(),
          });
        }
      } catch (error) {
        // Yah, something is not working above.
        toast.error("Something went wrong...");
      }
    };

    fetchRateFromHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, formData.submitted]);

  return (
    <homeContext.Provider
      value={{ rateHistory, formData, handleChange, setFormData }}
    >
      {children}
    </homeContext.Provider>
  );
};

export default HomeProvider;
