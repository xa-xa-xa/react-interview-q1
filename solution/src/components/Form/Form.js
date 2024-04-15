import React, { useState } from "react";
import { isNameValid } from "../../mock-api/apis";
import Table from "../Table/Table";
import "./Form.css";

const Form = ({ locationOptions }) => {
  // IRL everything should be in sepate files and folders, but symplicity of assigment keep it here

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [nameError, setNameError] = useState(null);
  const [tableData, setTableData] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !location) {
      setNameError("Please enter a name and select a location.");
      return;
    }

    if (nameError && name?.length) {
      setNameError("This name already exists in the table.");
      return;
    }

    // Add new data to table state
    setTableData([...tableData, { name, location }]);

    // Clear form fields after submission
    setName("");
    setLocation("");
    setNameError(null);
  };

  const handleNameChange = async (event) => {
    setName(event.target.value);

    if (!event.target.value) {
      setNameError("Please enter a name.");
    } else {
      setNameError(null); // Clear error if name is entered
      const apiValidationError = await isNameValid();

      if (apiValidationError && name?.length) {
        setNameError("This name already exists in the table.");
        return;
      }
    }
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleClearForm = () => {
    setName("");
    setLocation("");
    setNameError(null);

    // Clear table data on button click
    setTableData([]);
  };

  return (
    <>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
            className={nameError ? "form-input error" : "form-input"} // Conditional class for error
          />
          {nameError && <p className="error-message">{nameError}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="location" className="form-label">
            Location:
          </label>
          <select
            id="location"
            value={location}
            onChange={handleLocationChange}
            className="form-input"
          >
            <option value="">Select Location</option>
            {locationOptions &&
              locationOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
        </div>

        <section className="buttons">
          <button type="submit" className="form-button">
            Add
          </button>
          <button
            type="button"
            onClick={handleClearForm}
            className="form-button clear"
          >
            Clear
          </button>
        </section>
      </form>

      <Table tableData={tableData} />
    </>
  );
};

export default Form;
