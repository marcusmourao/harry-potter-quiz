class DateHelper {
  static getCurrentISODateString() {
    if (process.env.NODE_ENV === 'none') return '2019-01-20T11:31:15.073Z';
    return new Date().toISOString();
  }

  static getNewDate() {
    if (process.env.NODE_ENV === 'none') return new Date('2019-01-20T11:31:15.073Z');
    return new Date();
  }

  static getDateNow() {
    if (process.env.NODE_ENV === 'none') return 1547983875073;
    return Date.now();
  }
}

export default DateHelper;
