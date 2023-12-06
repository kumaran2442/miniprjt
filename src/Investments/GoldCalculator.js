import React, { useState } from 'react';
import './Investments.css';

const GoldRate = () => {
  const [currentGoldRate, setCurrentGoldRate] = useState(5000); // Initial gold rate
  const [numberOfYears, setNumberOfYears] = useState(1); // Default to 1 year

  const calculateFutureGoldRate = () => {
    const futureGoldRate = currentGoldRate * Math.pow(1 +0.04, numberOfYears);
    return futureGoldRate.toFixed(2); // Displaying the result with two decimal places
  };

  return (
    <div>
      <h1>Gold Rate Calculator</h1>
     
      {/* Input field for the number of years */}
      <label>
        Enter Todays Gold Rate:
        <input
          type="number"
          value={currentGoldRate}
          onChange={(e) => setCurrentGoldRate(e.target.value)}
        />
      </label>
      <label>
        Number of Years:
        <input
          type="number"
          value={numberOfYears}
          onChange={(e) => setNumberOfYears(e.target.value)}
        />
      </label>
      <p>Future Gold Rate: ₹{calculateFutureGoldRate()}</p>

      {/* You can also add input fields for current gold rate and inflation rate */}
      {/* For simplicity, I'm not including those input fields in this example */}
    </div>
  );
};

export default GoldRate;
