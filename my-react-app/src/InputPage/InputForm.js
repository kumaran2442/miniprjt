import React, { useState } from 'react';
import './InputForm.css';

function InputForm() {
    // State to store the values of the input fields
    const [inputValues, setInputValues] = useState({
        name: '',
        field2: '',
        field3: '',
        field4: '',
        field5: '',
        field6: '',
        field7: '',
        field8: '',
        field9: '',
        field10: '',
    });

    // Handler function to update the state when any input field changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // Handler function to submit the form (you can customize this according to your needs)
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform actions with inputValues
        console.log('Form submitted:', inputValues);
        // Add additional logic here, such as sending data to a server or processing the form data
    };

    return (
        <div>
            <br/>
            <h1>Input fields</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="field1">Name:</label>
                <input
                    placeholder="Name"
                    type="text"
                    id="field1"
                    name="field1"
                    value={inputValues.field1}
                    onChange={handleInputChange} />

                {/* Repeat the above structure for the remaining fields (field2 to field10) */}

                <label htmlFor="field2">Age:</label>
                <input
                    type="number"
                    id="field2"
                    name="field2"
                    value={inputValues.field2}
                    onChange={handleInputChange} />

                {/* Repeat for fields 3 to 10 */}
                <label htmlFor="field1">Current Savings:</label>
                <input
                    type="number"
                    id="field1"
                    name="field1"
                    value={inputValues.field1}
                    onChange={handleInputChange} />
                <label htmlFor="field1">Monthly Expenses:</label>
                <input
                    type="number"
                    id="field1"
                    name="field1"
                    value={inputValues.field1}
                    onChange={handleInputChange} />
                 {/* Goals Input*/}    
               <label htmlFor="field1">Goal 1:</label>
                <input
                    placeholder='Goal'
                    type="text"
                    id="field1"
                    name="field1"
                    value={inputValues.field1}
                    onChange={handleInputChange} />
                <input
                    placeholder='amount required'
                    type="number"
                    id="field1"
                    name="field1"
                    value={inputValues.field1}
                    onChange={handleInputChange} />    
                <label htmlFor="field1">Goal 2:</label>
                <input
                    placeholder='Goal'
                    type="text"
                    id="field1"
                    name="field1"
                    value={inputValues.field1}
                    onChange={handleInputChange} />
                <input
                    placeholder='amount required'
                    type="number"
                    id="field1"
                    name="field1"
                    value={inputValues.field1}
                    onChange={handleInputChange} />     
                <label htmlFor="field1">Goal 3:</label>
                <input
                    placeholder='Goal'
                    type="text"
                    id="field1"
                    name="field1"
                    value={inputValues.field1}
                    onChange={handleInputChange} />
                <input
                    placeholder='amount required'
                    type="number"
                    id="field1"
                    name="field1"
                    value={inputValues.field1}
                    onChange={handleInputChange} />     
                <label htmlFor="field1">Goal 4:</label>
                <input
                    placeholder='Goal'
                    type="text"
                    id="field1"
                    name="field1"
                    value={inputValues.field1}
                    onChange={handleInputChange} />
                <input
                    placeholder='amount required'
                    type="number"
                    id="field1"
                    name="field1"
                    value={inputValues.field1}
                    onChange={handleInputChange} />     
                <label htmlFor="field1">Goal 5:</label>
                <input
                    placeholder='Goal'
                    type="text"
                    id="field1"
                    name="field1"
                    value={inputValues.field1}
                    onChange={handleInputChange} />
                <input
                    placeholder='amount required'
                    type="number"
                    id="field1"
                    name="field1"
                    value={inputValues.field1}
                    onChange={handleInputChange} />     
                <label htmlFor="field1">Goal 6</label>
                <input
                    placeholder='Goal'
                    type="text"
                    id="field1"
                    name="field1"
                    value={inputValues.field1}
                    onChange={handleInputChange} />
                <input
                    placeholder='amount required'
                    type="number"
                    id="field1"
                    name="field1"
                    value={inputValues.field1}
                    onChange={handleInputChange} />     


                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default InputForm;
