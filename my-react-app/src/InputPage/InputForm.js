import React, { useState } from "react";
import "./InputForm.css";
import { calculateFutureValue } from "../Utils/Calculation.js";

function InputForm() {
  const [inputValues, setInputValues] = useState([]);
  const [currentMonthlyExpenses, setCurrentMonthlyExpenses] = useState("");
  const [retiredExpenses, setRetiredExpenses] = useState("");
  const [inflation, setInflation] = useState("");
  const [age, setAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [lifeExpectancy, setLifeExpectancy] = useState("");

  const [yearsForRetirement, setYearsForRetirement] = useState("");
  const [yearsInRetirement, setYearsInRetirement] = useState("");
  const [monthlyExpensesPostRetirement, setMonthlyExpensesPostRetirement] = useState("");

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    setInputValues((prevState) => {
      const updatedValues = [...prevState];
      updatedValues[index][name] = value;
      return updatedValues;
    });
  };

  const handleAddGoal = () => {
    setInputValues((prevState) => [
      ...prevState,
      { goal: "", cost: "", horizon: "" },
    ]);
  };
  const handleTopFieldsChange = () => {
    const yearsForRetirementValue = retirementAge - age;
    const yearsInRetirementValue = lifeExpectancy - retirementAge;

    setYearsForRetirement(yearsForRetirementValue);
    setYearsInRetirement(yearsInRetirementValue);
    const futureValue = calculateFutureValue(inflation/100, yearsForRetirement, currentMonthlyExpenses);
    const result = (futureValue * (retiredExpenses/100)).toFixed(0);
    setMonthlyExpensesPostRetirement(result);
  };
  const handleRemoveGoal = (index) => {
    setInputValues((prevState) => {
      const updatedValues = [...prevState];
      updatedValues.splice(index, 1);
      return updatedValues;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any necessary validation or processing of the goal purposes data
    console.log(inputValues);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div class="top-fields">
          <div className="top-left-fields">
            <div className="top-field">
              <label>Annual expenses if retired today (in lakhs):</label>
              <input
                type="number"
                value={currentMonthlyExpenses}
                onChange={(event) => setCurrentMonthlyExpenses(event.target.value)}
              />
            </div>
            <div className="top-field">
              <label>Inflation (your thoughts in %):</label>
              <input
                type="number"
                value={inflation}
                onChange={(event) => setInflation(event.target.value)}
              />
            </div>
            <div className="top-field">
              <label>Age:</label>
              <input
                type="number"
                value={age}
                onChange={(event) => setAge(event.target.value)}
              />
            </div>
            <div className="top-field">
              <label>Age of retirement:</label>
              <input
                type="number"
                value={retirementAge}
                onChange={(event) => setRetirementAge(event.target.value)}
              />
            </div>
            <div className="top-field">
              <label>Life Expectancy:</label>
              <input
                type="number"
                value={lifeExpectancy}
                onChange={(event) => setLifeExpectancy(event.target.value)}
              />
            </div>
            <div className="top-field">
              <label>
                 % expenses after retirement:
              </label>
              <input
                type="number"
                value={retiredExpenses}
                onChange={(event) => setRetiredExpenses(event.target.value)}
              />
            </div>
          </div>

          <div className="top-right-fields">
            <div className="right-field">
              <label>Number of years for retirement:</label>
              <input
                type="number"
                value={yearsForRetirement}
                onChange={(event) => setYearsForRetirement(event.target.value)}
                onBlur={handleTopFieldsChange}
                readOnly
              />
            </div>
            <div className="right-field">
              <label>Number of years in retirement:</label>
              <input
                type="number"
                value={yearsInRetirement}
                onChange={(event) => setYearsInRetirement(event.target.value)}
                onBlur={handleTopFieldsChange}
                readOnly
              />
            </div>
            <div className="right-field">
              <label>Value of monthly expenses post retirement:</label>
              <input
                type="number"
                value={monthlyExpensesPostRetirement}
                onChange={(event) => setMonthlyExpensesPostRetirement(event.target.value)}
                onBlur={handleTopFieldsChange}
                readOnly
              />
            </div>
          </div>
        </div>
        {inputValues.map((goal, index) => (
          <div key={index} className="goal-row">
            <input
              type="text"
              name="goal"
              value={goal.goal}
              onChange={(event) => handleInputChange(event, index)}
              placeholder="Goal"
            />
            <input
              type="number"
              name="cost"
              value={goal.cost}
              onChange={(event) => handleInputChange(event, index)}
              placeholder="Cost (today)"
            />
            <input
              type="number"
              name="horizon"
              value={goal.horizon}
              onChange={(event) => handleInputChange(event, index)}
              placeholder="Horizon (in years)"
            />
            <button
              type="button"
              onClick={() => handleRemoveGoal(index)}
              className="remove-button"
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddGoal} className="add-button">
          Add Goal
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default InputForm;
