function calculateFutureValue(rate, nper, pv) {
  const futureValue = pv * Math.pow(1 + rate, nper);
  return futureValue.toFixed(0); // Adjust the decimal places as needed
}

function calculateMonthlySavings(costIfDoItNow, horizonToSaveMoney, goalInflation, toBeInvestedAmountReturnRate) {
  // Calculate the future cost of the goal
  const futureCost = costIfDoItNow * Math.pow(1 + goalInflation, horizonToSaveMoney);

  // Calculate the monthly interest rate
  const monthlyInterestRate = toBeInvestedAmountReturnRate / 12 / 100;

  // Calculate the monthly savings needed
  const monthlySavings = futureCost * monthlyInterestRate / (
      Math.pow(1 + monthlyInterestRate, (horizonToSaveMoney*12)) - 1);

  return monthlySavings.toFixed(0);
}

export { calculateFutureValue, calculateMonthlySavings}