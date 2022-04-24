import ReportFilters from "./report-filters";
import ExchangeStats from "./exchange-stats";
import { useContext } from "react";
import ChartReport from "./report/chart-report";
import TableReport from "./report/table-report";
import { homeContext } from "../provider/home.provider";

const ExchangeReport = () => {
  // fetching data from homeContext
  const { formData } = useContext(homeContext);

  // setting dyanamic ReportComponent
  const ReportComponent =
    formData.reportFormat === "table" ? TableReport : ChartReport;

  return (
    <div className="row">
      <div className="mb-3 col-md-8">
        <ReportFilters />
      </div>
      <div className="col-md-8">
        <div className="card">
          <div className="card-body py-0">
            <ReportComponent />
          </div>
        </div>
      </div>
      <div className="col-md-3 mt-4 ms-md-4 mt-md-0 ">
        <div className="card">
          <div className="card-body py-0">
            <ExchangeStats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeReport;
