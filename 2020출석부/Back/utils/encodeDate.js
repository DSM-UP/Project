const decodeDate = (f, t) => {
    let from, to;
    if(Number(f) > Number(t)) {
        from = Number(t); to = Number(f);
    } else {
        from = Number(f), to = Number(t);
    }
    let obj = {};
    obj.fromYear = getYear(from); obj.toYear = getYear(to);
    obj.fromMonth = getMonth(from); obj.toMonth = getMonth(to);
    obj.fromDay = getDay(from); obj.toDay = getDay(to);
    obj.fromPeriod = getPeriod(from); obj.toPeriod = getPeriod(to);
    return obj;
}

const encodeDate = (year, month, day, period) => {
    return Number(String(year) + check(month) + check(day) + check(period));
}

const check = (p) => {
    return String(p < 10 ? '0' + p : p);
}

const getMonthDay = (year, month) => {
    switch(month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
        case 2:
            return isLeapYear(year) ? 29 : 28;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
        default:
            return -1;
    }
}

const isLeapYear = (year) => {
    if(!(year % 4)) {
        if(!(year % 100)) {
            if(year % 400) {
                return true;
            }
            return false;
        }
        return true;
    }
    return false;
}

const getYear = (encoded) => {
    return Math.floor(Number(encoded) / 1000000);
}

const getMonth = (encoded) => {
    const s = Number(encoded) - getYear(encoded) * 1000000;
    return Math.floor(s / 10000);
}

const getDay = (encoded) => {
    const s = Number(encoded) - getYear(encoded) * 1000000 - getMonth(encoded) * 10000;
    return Math.floor(s / 100);
}

const getPeriod = (encoded) => {
    const s = Number(encoded) - getYear(encoded) * 1000000 - getMonth(encoded) * 10000 - getDay(encoded) * 100;
    return s;
}

module.exports = { encodeDate, decodeDate, getMonthDay };