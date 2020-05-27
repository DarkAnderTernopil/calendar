import moment from 'moment';

const getDaysArrayByMonth = (month) => {
  let daysInMonth = moment(month, 'MM').daysInMonth();
  const arrDays = [];
  while (daysInMonth) {
    const current = moment(month, 'MM').date(daysInMonth);
    arrDays.push(current);
    daysInMonth--;
  }
  return arrDays;
};
export { getDaysArrayByMonth };
