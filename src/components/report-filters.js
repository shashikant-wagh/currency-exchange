import { useContext } from "react";
import { homeContext } from "../provider/home.provider";

const ReportFilters = () => {
  const { formData, setFormData, handleChange } = useContext(homeContext);

  const handleDurationChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      // trigger requst by setting submitted
      submitted: !!prevState.conversionRate,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="row justify-content-between">
      <div className="col-6">
        <label htmlFor="duration">Duration</label>
        <select
          required
          id="duration"
          name="duration"
          className="form-select"
          value={formData.duration}
          onChange={handleDurationChange}
        >
          <option value="7">7 days</option>
          <option value="14">14 days</option>
          <option value="30">30 days</option>
        </select>
      </div>
      <div className="col-6 mt-auto mb-0 text-end">
        <div className="form-check form-check-inline">
          <input
            type="radio"
            id="table"
            value="table"
            name="reportFormat"
            className="form-check-input"
            checked={formData.reportFormat === "table"}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="table">
            Table
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            id="chart"
            value="chart"
            name="reportFormat"
            className="form-check-input"
            checked={formData.reportFormat === "chart"}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="chart">
            Chart
          </label>
        </div>
      </div>
    </div>
  );
};

export default ReportFilters;
