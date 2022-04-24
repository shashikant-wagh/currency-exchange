import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useContext } from "react";
import { Line } from "react-chartjs-2";
import { homeContext } from "../../provider/home.provider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartReport = ({ rates }) => {
  // fetching data from homeContext
  const { formData, rateHistory } = useContext(homeContext);

  // setting chart title
  const title = `${formData.from} to ${formData.to} exchange rates in last ${formData.duration} days.`;

  return (
    <Line
      options={{
        responsive: true,
        scales: {
          x: {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 20,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: title,
          },
        },
      }}
      data={{
        // setting chart labels
        labels: Object.keys(rateHistory),
        datasets: [
          {
            id: 1,
            label: "",
            borderColor: "#009688",
            // setting chart data
            data: Object.values(rateHistory),
          },
        ],
      }}
    />
  );
};

export default ChartReport;
