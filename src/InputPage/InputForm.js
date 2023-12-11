import React, { useState,useEffect } from "react";
import "./InputForm.css";
import { calculateFutureValue } from "../Utils/Calculation.js";
import rupeeIcon from "../assets/rupee-indian.png";
import "./ToolTip.css"


function InputForm() {
  const [inputValues, setInputValues] = useState([]);
  const[annualincome,setannualincome]=useState("");
  const[annualincrement,setannualincrement]=useState("");
  const [currentMonthlyExpenses, setCurrentMonthlyExpenses] = useState("");
  const [retiredExpenses, setRetiredExpenses] = useState("");
  const [inflation, setInflation] = useState("");
  const [age, setAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [lifeExpectancy, setLifeExpectancy] = useState("");

  const [yearsForRetirement, setYearsForRetirement] = useState("");
  const [yearsInRetirement, setYearsInRetirement] = useState("");
  const [monthlyExpensesPostRetirement, setMonthlyExpensesPostRetirement] =
    useState("");

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    setInputValues((prevState) => {
      const updatedValues = [...prevState];
      updatedValues[index][name] = value;
      
      // Calculate costAtTimeOfGoal if cost, goalInflation, and horizon values are present
      if (
        updatedValues[index].cost &&
        updatedValues[index].goalInflation &&
        updatedValues[index].horizon
      ) {
        const futureValue = calculateFutureValue(
          updatedValues[index].goalInflation / 100,
          updatedValues[index].horizon,
          updatedValues[index].cost
        );
        updatedValues[index].costAtTimeOfGoal = futureValue;
      }
      
      return updatedValues;
    });
  };

  const handleAddGoal = () => {
    setInputValues((prevState) => [
      ...prevState,
      { goal: "", cost: "", goalInflation:"", horizon: "", category: "", costAtTimeOfGoal:0, alreadyInvestedAmount:0, alreadyInvestedAmountReturnRate:0},
    ]);
  };
  const handleTopFieldsChange = () => {
    const yearsForRetirementValue = retirementAge - age;
    const yearsInRetirementValue = lifeExpectancy - retirementAge;

    setYearsForRetirement(yearsForRetirementValue);
    setYearsInRetirement(yearsInRetirementValue);
    const futureValue = calculateFutureValue(
      inflation / 100,
      yearsForRetirement,
      currentMonthlyExpenses
    );
    const result = (futureValue * (retiredExpenses / 100)).toFixed(0);
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
  const InflatationValidation=(v)=>
  {
    if( v>10 ||v<7)alert("the inflataion rate occurs between 7 and 10");
  };

  const Numvalidation=(n)=>
  {
    if(n<10 || n>100) alert("Kindly enter the correct details in the input field");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="top-fields">
          <div className="top-left-fields">
            <div className="top-field">
              <label>Monthly expenses if retired today:</label>
              <div className="icon-wrap">
                <span className="icon-code">&#8377;</span>
                <input
                  className="text-currency align-right"
                  type="number"
                  value={currentMonthlyExpenses}
                  onChange={(event) =>
                    setCurrentMonthlyExpenses(event.target.value)
                  }
                />
              </div>
            </div>
            <div className="top-field">
              <label>Inflation (your thoughts in %):</label>
              <div className="icon-wrap">
                <span className="icon-code">%</span>
                <input
                  className="text-currency align-right"
                  type="number"
                  value={inflation}
                  onBlur={() => InflatationValidation(inflation)}
                  onChange={(event) => setInflation(event.target.value)}
                />
              </div>
            </div>
            <div className="top-field">
              <label>Age:</label>
              <input
                type="number"
                value={age}
                onChange={(event) => setAge(event.target.value)}
              />
              <div class="tooltip">&#9432;
                   <span class="tooltiptext">info about</span>
              </div>
            </div>
            <div className="top-field">
              <label>Age of retirement:</label>
              <input
                type="number"
                value={retirementAge}
                tooltipText="enter your retirement"
                onBlur={()=>Numvalidation(retirementAge)}
                onChange={(event) => setRetirementAge(event.target.value)}
              />
                <div class="tooltip">&#9432;
                   <span class="tooltiptext">info about</span>
              </div>
            </div>
          
            <div className="top-field">
              <label>Life Expectancy:</label>
              <input
                type="number"
                value={lifeExpectancy}
                onBlur={()=>Numvalidation(lifeExpectancy)}
                onChange={(event) => setLifeExpectancy(event.target.value)}
              />
                <div class="tooltip">&#9432;
                   <span class="tooltiptext">info about</span>
              </div>
            </div>
            <div className="top-field">
              <label>% expenses after retirement:</label>
              <input
                type="number"
                value={retiredExpenses}
                onBlur={()=>Numvalidation(retiredExpenses)}
                onChange={(event) => setRetiredExpenses(event.target.value)}
              />
                <div class="tooltip">&#9432;
                   <span class="tooltiptext">info about</span>
              </div>
            </div>
            <div className="top-field">
              <label>Annual Income:</label>
              <div className="icon-wrap">
              <span className="icon-code">&#8377;</span>
              </div>
              <input
                type="number"
                value={annualincome}
                onChange={(event) => setannualincome(event.target.value)}
              />
                <div class="tooltip">&#9432;
                   <span class="tooltiptext">info about</span>
              </div>
            </div>
            <div className="top-field">
              <label>% Annual Increment:</label>
              <input
                type="number"
                value={annualincrement}
                onBlur={()=>Numvalidation(annualincrement)}
                onChange={(event) => setannualincome(event.target.value)}
              />
                <div class="tooltip">&#9432;
                   <span class="tooltiptext">info about</span>
              </div>
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
                onChange={(event) =>
                  setMonthlyExpensesPostRetirement(event.target.value)
                }
                onBlur={handleTopFieldsChange}
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="goals">
          <h2 className="goals-heading">Goals</h2>
          <div className="goals-list">
            <div className="goal-row heading">
              <label>Goal Purpose</label>
              <label>Cost (today)</label>
              <label className="small-input">Goal Inflation in %</label>
              <label className="small-input">Horizon (in years)</label>
              <label>Category (select)</label>
              <label>Cost at time of Goal</label>
              <label>Invested Amount</label>
              <label>Input 1</label>
              <label>Input 2</label>
              <label className="small-input">Invested Amount Return Rate</label>
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
                  placeholder="₹"
                  type="number"
                  name="cost"
                  value={goal.cost}
                  onChange={(event) => handleInputChange(event, index)}
                />
                <input
                  type="number"
                  name="goalInflation"
                  value={goal.goalInflation}
                  onChange={(event) => handleInputChange(event, index)}
                  className="small-input"
                />
                <input
                  type="number"
                  name="horizon"
                  value={goal.horizon}
                  onChange={(event) => handleInputChange(event, index)}
                  className="small-input"
                />
                <select
                  name="category"
                  value={goal.category}
                  onChange={(event) => handleInputChange(event, index)}
                >
                  <option value="">Select Field</option>
                  <option value="Family">Family</option>
                  <option value="Children">Children</option>
                  <option value="Personal">Personal</option>
                  <option value="Retirement">Retirement</option>
                  <option value="Other">Other</option>
                </select>

                <input
                  type="number"
                  name="costAtTimeOfGoal"
                  value={goal.costAtTimeOfGoal}
                  onChange={(event) => handleInputChange(event, index)}
                  readOnly
                />
                <input
                  type="number"
                  name="alreadyInvestedAmount"
                  value={goal.alreadyInvestedAmount}
                  onChange={(event) => handleInputChange(event, index)}
                  placeholder="Already invested amount"
                />
                <input
                  type="number"
                  name="alreadyInvestedAmountReturnRate"
                  value={goal.alreadyInvestedAmountReturnRate}
                  onChange={(event) => handleInputChange(event, index)}
                  className="small-input"
                />
                {/* new two input field
                <input
                  type="number"
                  name="alreadyInvestedAmountReturnRate"
                  value={goal.alreadyInvestedAmountReturnRate}
                  onChange={(event) => handleInputChange(event, index)}
                  className="small-input"
                />
                <input
                  type="number"
                  name="alreadyInvestedAmountReturnRate"
                  value={goal.alreadyInvestedAmountReturnRate}
                  onChange={(event) => handleInputChange(event, index)}
                  className="small-input"
                />
            */}
                <button
                  type="button"
                  onClick={() => handleRemoveGoal(index)}
                  className="remove-button align-self-center"
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddGoal}
              className="add-button"
            >
              +
            </button>
            <div className="bottomRightInput">
                <label>Total</label>
                <input type="text" 
                placeholder="Type here"
                />
                </div>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default InputForm;
