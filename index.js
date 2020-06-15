// Your code here
function createEmployeeRecords(employeeArray) {
  return employeeArray.map(createEmployeeRecord);
}

function createEmployeeRecord(employee) {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createTimeInEvent(employeeRecord, timestamp) {
  const timeInEvent = createTimeEvent("TimeIn", timestamp);
  employeeRecord.timeInEvents.push(timeInEvent);
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timestamp) {
  const timeOutEvent = createTimeEvent("TimeOut", timestamp);
  employeeRecord.timeOutEvents.push(timeOutEvent);
  return employeeRecord;
}

const createTimeEvent = (eventType, timestamp) => {
  return {
    type: eventType,
    hour: parseTimestampHour(timestamp),
    date: parseTimestampDate(timestamp)
  }
}

const parseTimestampHour = (timestamp) => parseInt(timestamp.slice(-4));
const parseTimestampDate = (timestamp) => timestamp.slice(0, -5);

function calculatePayroll(employeeRecords) {
  const totalPay = employeeRecords.reduce(((total, record) => total + allWagesFor(record)), 0);
  return totalPay;
}

function allWagesFor(employeeRecord) {
  const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
  const earningsOnDatesWorked = datesWorked.map(date => wagesEarnedOnDate(employeeRecord, date));
  const totalEarnings = earningsOnDatesWorked.reduce(((total, earning) => total + earning), 0);
  return totalEarnings;
}

function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  const wagesEarned = hoursWorked * employeeRecord.payPerHour;
  return wagesEarned;

}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
  const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
  const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
  return hoursWorked;
}

function findEmployeeByFirstName(employeeRecords, firstName) {
  return employeeRecords.find(record => record.firstName === firstName);
}