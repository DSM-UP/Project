module.exports = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const dat = date.getDate();
  if (date.getDay() === 5) {
    if (date >= new Date(year, month, dat, 4, 40) && date < new Date(year, month, dat, 6, 40)) {
      return 8;
    } else if (date >= new Date(year, month, dat, 6, 40) && date < new Date(year, month, dat, 7, 40)) {
      return 9;
    } else if (date >= new Date(year, month, dat, 7, 40) && date < new Date(year, month, dat, 8, 30)) {
      return 10;
    } else {
      return 7;
    }
  } else {
    if (date >= new Date(year, month, dat, 6, 40) && date < new Date(year, month, dat, 7, 40)) {
      return 9;
    } else if (date >= new Date(year, month, dat, 7, 40) && date < new Date(year, month, dat, 8, 30)) {
      return 10;
    } else {
      return 8;
    }
  }
}