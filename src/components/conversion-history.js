import {
  doc,
  query,
  getDocs,
  orderBy,
  deleteDoc,
  collection,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../utils/firebase.utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/date.utils";
import HistoryRecord from "../classes/history-record.class";

const ConversionHistory = () => {
  const navigate = useNavigate();
  // initializing records state
  const [records, setRecords] = useState([]);
  // initializing loading state
  const [loading, setLoading] = useState(true);

  const handleView = (index) => {
    const record = records[index].originalRecord;
    const end_date = formatDate(record.timestamp.toDate());
    const redirectTo = `/?end_date=${end_date}&amount=${record.amount}&from=${record.from}&to=${record.to}`;
    // setting query params and redirects to home page
    navigate(redirectTo);
  };

  const handleDelete = async (index) => {
    if (window.confirm("Confirm, you want to remove this record.")) {
      try {
        // Deleting record from db
        const record = records[index];
        const recordsCopy = records.slice();
        recordsCopy.splice(index, 1);

        await deleteDoc(doc(db, "history", record.id));
        setRecords(recordsCopy);
        toast.success("Record deleted successfully.");
      } catch (error) {
        // Yah, something is not working above.
        toast.error("Something went wrong...");
      }
    }
  };

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        // fetching data from db, Loaded Goat...
        const getQuery = query(
          collection(db, "history"),
          orderBy("timestamp", "desc")
        );
        const docSnap = await getDocs(getQuery);
        setRecords(docSnap.docs.map((doc) => new HistoryRecord(doc)));
      } catch (error) {
        // Yah, something is not working above.
        toast.error("Something went wrong...");
      }
      setLoading(false);
    };

    fetchRecords();
  }, []);

  return (
    <table className="table card-body mt-auto mb-0">
      <thead>
        <tr>
          <th>Date</th>
          <th>Event</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan="3" className="text-center text-primary">
              <p className="spinner-border my-2 text-center" role="status" />
            </td>
          </tr>
        ) : records.length ? (
          records.map((record, index) => (
            <tr key={record.id} className="align-middle">
              <td>{record.dateTime}</td>
              <td> {record.event} </td>
              <td>
                <span
                  className="btn btn-link text-decoration-none text-success p-0"
                  onClick={() => handleView(index)}
                >
                  <span className="material-icons align-bottom icon-sm pe-1">
                    remove_red_eye
                  </span>
                  View
                </span>
                <span
                  className="ms-md-3 btn btn-link text-decoration-none text-danger p-0"
                  onClick={() => handleDelete(index)}
                >
                  <span className="material-icons align-bottom icon-sm pe-1">
                    delete_forever
                  </span>
                  Delete
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="text-center">
              No Records Found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ConversionHistory;
