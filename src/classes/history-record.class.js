import { formatDate, formatTime } from "../utils/date.utils";

class HistoryRecord {
  constructor(record) {
    this.originalRecord = record.data();
    this.id = record.id;
    this.event = HistoryRecord.getEvent(this.originalRecord);
    this.dateTime = HistoryRecord.getDateTime(this.originalRecord.timestamp);
  }

  static getDateTime(timestamp) {
    let dateObj = timestamp.toDate();
    return formatDate(dateObj, true) + " @ " + formatTime(dateObj);
  }

  static getEvent({ amount, from, to }) {
    return `Converted an amount of ${amount} from ${from} to ${to}`;
  }
}

export default HistoryRecord;
