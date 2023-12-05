import React, { useState } from 'react';

const SavingsCalculator = () => {
  const [monthlySavings, setMonthlySavings] = useState('');
  const [numberOfYears, setNumberOfYears] = useState('');
  const [totalSavings, setTotalSavings] = useState(null);

  const calculateTotalSavings = () => {
    const savings = parseFloat(monthlySavings);
    const rate = 4 / 100;
    const years = parseFloat(numberOfYears);

    if (isNaN(savings) || isNaN(rate) || isNaN(years) || savings <= 0 || rate <= 0 || years <= 0) {
      // Handle invalid input
      alert('Please enter valid values for monthly savings, interest rate, and number of years.');
      return;
    }

    const total = savings * ((Math.pow(1 + rate, years) - 1) / rate);
    setTotalSavings(total.toFixed(2));
  };

  return (
    <div>
      <h1>Savings Account</h1>
      <div>
        <label>Monthly Savings:</label>
        <input
          type="number"
          value={monthlySavings}
          onChange={(e) => setMonthlySavings(e.target.value)}
        />
      </div>
      <div>
        <label>Number of Years:</label>
        <input
          type="number"
          value={numberOfYears}
          onChange={(e) => setNumberOfYears(e.target.value)}
        />
      </div>
      <div>
        <button onClick={calculateTotalSavings}>Calculate Total Savings</button>
      </div>
      {totalSavings !== null && (
        <div>
          <h2>Total Savings on {numberOfYears} years: ₹{totalSavings}</h2>
        </div>
      )}
    </div>
  );
};

export default SavingsCalculator;
