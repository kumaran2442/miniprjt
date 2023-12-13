import React, { useState, useEffect } from "react";
import "./InputForm.css";
import { calculateFutureValue, calculateMonthlySavings } from "../Utils/Calculation.js";
import "./ToolTip.css"


function InputForm() {
  const [inputValues, setInputValues] = useState([]);
  const [annualIncome, setAnnualIncome] = useState("");
  const [annualIncrement, setAnnualIncrement] = useState("");
  const [currentMonthlyExpenses, setCurrentMonthlyExpenses] = useState("");
  const [retiredExpenses, setRetiredExpenses] = useState();
  const [inflation, setInflation] = useState("");
  const [age, setAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [lifeExpectancy, setLifeExpectancy] = useState("");

  const [yearsForRetirement, setYearsForRetirement] = useState("");
  const [yearsInRetirement, setYearsInRetirement] = useState("");
  const [totalMonthlyInvestmentAmount, setTotalMonthlyInvestmentAmount] = useState("");
  const [monthlyExpensesPostRetirement, setMonthlyExpensesPostRetirement] =
    useState(0);
  const [isTopFieldsVisible, setIsTopFieldsVisible] = useState(true);
  const [isGoalFieldsVisible, setIsGoalFieldsVisible] = useState(true);

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
        var horizon = Number(updatedValues[index].horizon)
        const futureValue = calculateFutureValue(
          Number(updatedValues[index].goalInflation) / 100,
          Number(updatedValues[index].horizon),
          Number(updatedValues[index].cost)
        );
        updatedValues[index].costAtTimeOfGoal = futureValue;

        if (horizon < 3) {
          updatedValues[index].toBeInvestedAmountReturnRate = 7; // fixed deposit
        } else if (horizon > 3 && horizon < 7) {
          updatedValues[index].toBeInvestedAmountReturnRate = 10; // debt mutual funds and bonds
        } else if (horizon > 7) {
          updatedValues[index].toBeInvestedAmountReturnRate = 12; // equity mutual funds
        }

        updatedValues[index].toBeInvestedAmount = calculateMonthlySavings(updatedValues[index].cost,
          horizon,
          Number(updatedValues[index].goalInflation) / 100,
          Number(updatedValues[index].toBeInvestedAmountReturnRate) / 100)
      }
      // Calculate totalMonthlyInvestmentAmount
      const totalInvestmentAmount = inputValues.reduce(
        (sum, goal) => sum + Number(goal.toBeInvestedAmount),
        0
      );
      setTotalMonthlyInvestmentAmount(totalInvestmentAmount.toFixed(0));
      return updatedValues;
    });

  };
  const handleAddGoal = () => {
    setInputValues((prevState) => [
      ...prevState,
      {
        goal: "",
        cost: 0,
        goalInflation: 0,
        horizon: 0,
        category: "",
        costAtTimeOfGoal: 0,
        alreadyInvestedAmount: 0,
        alreadyInvestedAmountReturnRate: 0,
        toBeInvestedAmount: 0,
        toBeInvestedAmountReturnRate: 0
      },
    ]);
  };
  const handleTopFieldsChange = () => {
    const yearsForRetirementValue = Number(retirementAge) - Number(age)
    const yearsInRetirementValue = Number(lifeExpectancy) - Number(retirementAge);

    setYearsForRetirement(yearsForRetirementValue);
    setYearsInRetirement(yearsInRetirementValue);
    const futureValue = calculateFutureValue(
      Number(inflation) / 100,
      Number(yearsForRetirement),
      Number(currentMonthlyExpenses)
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
  const inflationValidation = (v) => {
    if (v > 10 || v < 7) alert("the inflation rate occurs between 7 and 10");
  };

  const numValidation = (n) => {
    if (n < 10 || n > 100) alert("Kindly enter the correct details in the input field");
  };

  const handleToggleTopFields = () => {
    setIsTopFieldsVisible(!isTopFieldsVisible);
  }

  const handleToggleGoalFields = () => {
    setIsGoalFieldsVisible(!isGoalFieldsVisible);
  }
  return (
    <div className="container">
      <section className="general-info">
        <div className="display-flex">
          <h2 className="goals-heading">General And Retirement Information</h2>
          <span
            className="display-flex align-items-center"
            onClick={handleToggleTopFields}
            style={{ cursor: "pointer" }}
          >
            &#9660;
          </span>
        </div>

        {isTopFieldsVisible && (
          <div className="top-fields">
            <div className="top-left-fields">
              <div className="top-field">
                <label>Monthly expenses today:</label>
                <div className="icon-wrap">
                  <span className="icon-code">&#8377;</span>
                  <input
                    className="text-currency align-right"
                    type="number"
                    value={currentMonthlyExpenses}
                    onChange={(event) => {
                      setCurrentMonthlyExpenses(event.target.value);
                      handleTopFieldsChange();
                    }
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
                    placeholder="7-10%"
                    onBlur={() => inflationValidation(inflation)}
                    onChange={(event) => {
                      setInflation(event.target.value)
                      handleTopFieldsChange();
                    }}
                  />
                </div>
              </div>
              <div className="top-field">
                <label>Age:</label>
                <input
                  type="number"
                  className="align-right"
                  placeholder="enter your age"
                  value={age}
                  onChange={(event) => {
                    setAge(event.target.value);
                    handleTopFieldsChange();
                  }}
                />
                <div class="tooltip">&#9432;
                  <span class="tool-tip-text">info about</span>
                </div>
              </div>
              <div className="top-field">
                <label>Age of retirement:</label>
                <input
                  className="align-right"
                  type="number"
                  value={retirementAge}
                  placeholder="50?"
                  tooltipText="enter your retirement"
                  onBlur={() => numValidation(retirementAge)}
                  onChange={(event) => {
                    setRetirementAge(event.target.value)
                    handleTopFieldsChange();
                  }}
                />
                <div class="tooltip">&#9432;
                  <span class="tool-tip-text">info about</span>
                </div>
              </div>
              <div className="top-field">
                <label>Life Expectancy:</label>
                <input
                  type="number"
                  className="align-right"
                  placeholder="80?"
                  value={lifeExpectancy}
                  onBlur={() => numValidation(lifeExpectancy)}
                  onChange={(event) => {
                    setLifeExpectancy(event.target.value)
                    handleTopFieldsChange();
                  }}
                />
                <div class="tooltip">&#9432;
                  <span class="tool-tip-text">info about</span>
                </div>
              </div>
              <div className="top-field">
                <label>% expenses after retirement:</label>
                <input
                  type="number"
                  className="align-right"
                  value={retiredExpenses}
                  placeholder="70-80%"
                  onBlur={() => numValidation(retiredExpenses)}
                  onChange={(event) => {
                    setRetiredExpenses(event.target.value)
                    handleTopFieldsChange();
                  }}
                />
                <div class="tooltip">&#9432;
                  <span class="tool-tip-text">info about</span>
                </div>
              </div>
              <div className="top-field">
                <label>Annual Income:</label>
                <div className="icon-wrap">
                  <span className="icon-code">&#8377;</span>
                </div>
                <input
                  className="text-currency align-right"
                  type="number"
                  value={annualIncome}
                  onChange={(event) => setAnnualIncome(event.target.value)}
                />
                <div class="tooltip">&#9432;
                  <span class="tool-tip-text">Input total income you make from all sources in a year</span>
                </div>
              </div>
              <div className="top-field">
                <label>% Annual Increment:</label>
                <input
                  type="number"
                  className="align-right"
                  placeholder="10-15%"
                  value={annualIncrement}
                  onBlur={() => numValidation(annualIncrement)}
                  onChange={(event) => setAnnualIncrement(event.target.value)}
                />
                <div class="tooltip">&#9432;
                  <span class="tool-tip-text">info about</span>
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
                  readOnly
                />
              </div>
              <div className="right-field">
                <label>Number of years in retirement:</label>
                <input
                  type="number"
                  value={yearsInRetirement}
                  onChange={(event) => setYearsInRetirement(event.target.value)}
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
                  readOnly
                />
              </div>
            </div>
          </div>
        )}
      </section>
      <div className="goals">
        <div className="display-flex">
          <h2 className="goals-heading">Goals</h2>
          <span
            className="display-flex align-items-center"
            onClick={handleToggleGoalFields}
            style={{ cursor: "pointer" }}
          >
            &#9660;
          </span>
        </div>
        {isGoalFieldsVisible && (
          <div className="goals-list">
            <div className="goal-row heading">
              <label>Goal Purpose</label>
              <label>Cost (today)</label>
              <label className="small-input">Goal Inflation in %</label>
              <label className="small-input">Horizon (in years)</label>
              <label>Category (select)</label>
              <label>Cost at time of Goal</label>
              <label>Already Invested Amount</label>
              <label className="small-input">Already Invested Return Rate</label>
              <label className="small-input">To Be Invested Amount</label>
              <label className="small-input">To Be Invested Return Rate</label>
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
                <div>
                  <div className="icon-wrap">
                    <span className="icon-code">&#8377;</span>
                  </div>
                  <input
                    className="text-currency align-right"
                    type="number"
                    name="cost"
                    value={goal.cost}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                </div>
                <input
                  type="number"
                  name="goalInflation"
                  value={goal.goalInflation}
                  onChange={(event) => handleInputChange(event, index)}
                  className="small-input align-right"
                />
                <input
                  type="number"
                  name="horizon"
                  value={goal.horizon}
                  onChange={(event) => handleInputChange(event, index)}
                  className="small-input align-right"
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

                <div>
                  <div className="icon-wrap">
                    <span className="icon-code">&#8377;</span>
                  </div>
                  <input
                    className="text-currency align-right"
                    type="number"
                    name="costAtTimeOfGoal"
                    value={goal.costAtTimeOfGoal}
                    onChange={(event) => handleInputChange(event, index)}
                    readOnly
                  />
                </div>
                <div>
                  <div className="icon-wrap">
                    <span className="icon-code">&#8377;</span>
                  </div>
                  <input
                    className="text-currency align-right"
                    type="number"
                    name="alreadyInvestedAmount"
                    value={goal.alreadyInvestedAmount}
                    onChange={(event) => handleInputChange(event, index)}
                    placeholder="Already invested amount"
                  />
                </div>
                <input
                  type="number"
                  name="alreadyInvestedAmountReturnRate"
                  value={goal.alreadyInvestedAmountReturnRate}
                  onChange={(event) => handleInputChange(event, index)}
                  className="small-input align-right"
                />

                <div>
                  <div className="icon-wrap">
                    <span className="icon-code">&#8377;</span>
                  </div>
                  <input
                    className="text-currency align-right small-input"
                    type="number"
                    name="toBeInvestedAmount"
                    value={goal.toBeInvestedAmount}
                    readOnly
                  />
                </div>
                <input
                  type="number"
                  name="toBeInvestedAmountReturnRate"
                  value={goal.toBeInvestedAmountReturnRate}
                  className="small-input align-right"
                  readOnly
                />
                <button
                  type="button"
                  onClick={() => handleRemoveGoal(index)}
                  className="add-remove-button remove-button"
                >
                  X
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddGoal}
              className="add-remove-button add-button"
            >
              +
            </button>
            <div className="bottomRightInput">
              <label>Total</label>
              <div className="icon-wrap">
                <span className="icon-code">&#8377;</span>
              </div>
              <input
                className="text-currency align-right small-input"
                type="number"
                name="totalMonthlyInvestmentAmount"
                value={totalMonthlyInvestmentAmount}
                readOnly
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InputForm;
