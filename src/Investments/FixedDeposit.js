import React, { useState } from 'react';


const FixedDepositCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [tenure, setTenure] = useState('');
  const [maturityAmount, setMaturityAmount] = useState(null);

  const calculateMaturity = () => {
    const p = parseFloat(principal);
    const r = 8 / 100;
    const t = parseFloat(tenure);

    const maturity = p * Math.pow(1 + r, t);
    setMaturityAmount(maturity.toFixed(2));
  };

  return (
    <div>
      <h1>Fixed Deposit</h1>
      <div>
        <label>Principal Amount:</label>
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
        />
      </div>
      <div>
        <label>Tenure (years):</label>
        <input
          type="number"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
        />
      </div>
      <div>
        <button onClick={calculateMaturity}>Calculate Maturity</button>
      </div>
      {maturityAmount !== null && (
        <div>
          <h2>Maturity Amount: ₹{maturityAmount}</h2>
        </div>
      )}
    </div>
  );
};

export default FixedDepositCalculator;
