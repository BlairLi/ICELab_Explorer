import React from "react";
/* import ReactDOM from 'react-dom' */
import {useState} from "react";
/* import {Form} from "react-bootstrap"; */
import "../css/ExtractPage.css"
import { Cascader, Checkbox } from 'antd';
/* import { Form } from 'antd'; */
/* import { Select, MenuItem, FormControl, InputLabel, OutlinedInput, ListItemText, Checkbox } from '@mui/material'; */

  const climate = [
    {
      label: 'Light',
      value: 'light',
      children: new Array(20).fill(null).map((_, index) => ({
        label: `Number ${index}`,
        value: index,
      })),
    },
    {
      label: 'Bamboo',
      value: 'bamboo',
      children: [
        {
          label: 'Little',
          value: 'little',
          children: [
            {
              label: 'Toy Fish',
              value: 'fish',
            },
            {
              label: 'Toy Cards',
              value: 'cards',
            },
            {
              label: 'Toy Bird',
              value: 'bird',
            },
          ],
        },
      ],
    },
  ];

const Export = () => {
  const [defaultName, setDefaultName] = useState("Data");
  const [name, setName] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [startDate, setStartDate] = useState("1970-01-01T00:00");
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const [endDate, setEndDate] = useState(`${now.toISOString().slice(0, 11)}${hours}:${minutes}`);
  const [cascaderValue, setCascaderValue] = useState([]);

  const handleChange = (e) => {
    setName(e.target.value);
    if (e.target.value) {
      setDefaultName(e.target.value);
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleCascaderChange = (value) => {
    console.log(value);
    setCascaderValue(value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    if (endDate && new Date(endDate) < new Date(e.target.value)) {
      setEndDate(e.target.value);
    }
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    if (startDate && new Date(startDate) > new Date(e.target.value)) {
      setStartDate(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameValue = name || defaultName;
    const formatValue = e.target.querySelector("select").value;
    const dateRangeValue = isChecked ? "All" : `${startDate} - ${endDate}`;

    console.log(
      "Form submitted:",
      nameValue,
      formatValue,
      dateRangeValue,
      cascaderValue
    );

    const message = `Form submitted:\nName: ${nameValue}\nFile Format: ${formatValue}\nDate Range: ${dateRangeValue}\nSelected Options: ${cascaderValue.join(", ")}`;
    /* alert(
      `Form submitted:\nName: ${nameValue}\nFile Format: ${formatValue}\nDate Range: ${dateRangeValue}\n`
    ); */
    alert(message);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div class="row">
          <div class="column">
            <h1 className="heading1">Export Setting</h1>
            <div class="cusName">
              <strong>Name:</strong>
              <label class="custom-field one">
                <input
                  type="text"
                  placeholder=" "
                  value={name}
                  onChange={handleChange}
                />
                <span class="placeholder">Name</span>
              </label>
            </div>

            <div>
              <p class="fileFormat">File Format:</p>
              <div className="dropDown">
                <select required>
                  <option value="" disabled selected hidden>
                    Choose preference
                  </option>
                  <option value="CSV">CSV</option>
                  <option value="EXCEL">EXCEL</option>
                </select>
              </div>
            </div>

            <div>
              <p class="from">From</p>
              <input
                type="datetime-local"
                class="startdate"
                disabled={isChecked}
                value={startDate}
                onChange={handleStartDateChange}
              />
            </div>
            <div>
              <p class="to">To</p>
              <input
                type="datetime-local"
                class="Enddate"
                disabled={isChecked}
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>
            <Checkbox onChange={handleCheckboxChange}>Export All</Checkbox>
          </div>
  

          <div class="column">
            <h1 className="heading1">Device Setting</h1>
            <p class="station">Station and variable Setting</p>
            <Cascader
              style={{
                width: "100%",
              }}
              options={climate}
              onChange={handleCascaderChange}
              value={cascaderValue}
              multiple
              maxTagCount="responsive"
            />
          </div>
        </div>
        <center>
          <button type="submit">Click to Export</button>
        </center>
      </form>
    </>
  );
};

export default Export;