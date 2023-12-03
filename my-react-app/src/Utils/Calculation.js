function calculateFutureValue(rate, nper, pv) {
  const futureValue = pv * Math.pow(1 + rate, nper);
  return futureValue.toFixed(2); // Adjust the decimal places as needed
}

export { calculateFutureValue}