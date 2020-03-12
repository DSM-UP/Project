export default () => {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  const yoil = date.getDay();
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day; 
  }
  return `${year}.${month}.${day} (${getDay(yoil)})`;
}

function getDay(day) {
  switch (day) {
    case 0: return '일';
    case 1: return '월';
    case 2: return '화';
    case 3: return '수';
    case 4: return '목';
    case 5: return '금';
    case 6: return '토';
    default: return '월';
  }
}

export const get = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
}