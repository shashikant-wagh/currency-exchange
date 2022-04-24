export const formatDate = (dateObj, redable) => {
  let date = (dateObj || new Date()).toISOString().split("T")[0];
  return redable ? date.split("-").reverse().join("/") : date;
};

export const getPastDate = (dateObj, days) => {
  return new Date(new Date().setDate(new Date(dateObj).getDate() - days))
    .toISOString()
    .split("T")[0];
};

export const formatTime = (dateObj) => {
  return (
    ("0" + dateObj.getHours()).slice(-2) +
    ":" +
    ("0" + dateObj.getMinutes()).slice(-2)
  );
};
