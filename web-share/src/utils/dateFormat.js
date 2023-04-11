const dateFormat = (d) => {
  const newDate = new Date(d);
  const year = newDate.getFullYear();
  const month = newDate.toLocaleString('default', { month: 'long' });
  const date = newDate.getDate();
  return `${month} ${date}th, ${year}`;
};

export default dateFormat;

export const NumberDateFormat = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
};

export const eventDateFormat = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [day, month, year].join('/');
};

export const formatAMPM = (date) => {
  let newDate = new Date(date);
  let hours = newDate.getHours();
  let minutes = newDate.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}
