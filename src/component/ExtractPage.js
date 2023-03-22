import React from "react";
/* import ReactDOM from 'react-dom' */
import {useState} from "react";
import "../css/ExtractPage.css"
import { Cascader, Checkbox } from 'antd';
import Axios from "axios";
/* import * as XLSX from 'xlsx'; */
/* import { Form } from 'antd'; */
/* import { Select, MenuItem, FormControl, InputLabel, OutlinedInput, ListItemText, Checkbox } from '@mui/material'; */

const climate = [
  {
    label: 'White Glacier Nunatak',
    value: 'white Glacier Nunatak',
    children: [
      {
        label: 'Temperature (°C)',
        value: 'temperature (°C)',
      },
      {
        label: 'Relative humidity (%)',
        value: 'relative humidity (%)',
      },
      {
        label: 'Wind speed (m/s)',
        value: 'wind speed (m/s)',
      },
      {
        label: 'Wind direction (°)',
        value: 'wind direction (°)',
      },
      {
        label: 'Incoming/downward shortwave radiation (W/m^2)',
        value: 'incoming/downward shortwave radiation (W/m^2)',
      },
      {
        label: 'Snowdepth (m)',
        value: 'snowdepth (m)',
      },
      {
        label: 'Battery power (V)',
        value: 'battery power (V)',
      },
    ],
  },
  {
    label: 'White Glacier Melt Zone ',
    value: 'white Glacier Melt Zone ',
    children: [
      {
        label: 'Temperature (°C)',
        value: 'temperature (°C)',
      },
      {
        label: 'Relative humidity (%)',
        value: 'relative humidity (%)',
      },
      {
        label: 'Wind speed (m/s)',
        value: 'wind speed (m/s)',
      },
      {
        label: 'Wind direction (°)',
        value: 'wind direction (°)',
      },
      {
        label: 'Incoming/downward shortwave radiation (W/m^2)',
        value: 'incoming/downward shortwave radiation (W/m^2)',
      },
      {
        label: 'Outgoing/upward shortwave radiation (W/m^2)',
        value: 'outgoing/upward shortwave radiation (W/m^2)',
      },
      {
        label: 'Incoming/downward longwave radiation (W/m^2)',
        value: 'incoming/downward longwave radiation (W/m^2)',
      },
      {
        label: 'Outgoing/upward longwave radiation (W/m^2)',
        value: 'outgoing/upward longwave radiation (W/m^2)',
      },
      {
        label: 'Distance to ice (m)',
        value: 'distance to ice (m)',
      },
      {
        label: 'Battery power (V)',
        value: 'battery power (V)',
      },
    ],
  },
  {
    label: 'White Glacier Moraine',
    value: 'white Glacier Moraine',
    children: [
      {
        label: 'Temperature (°C)',
        value: 'temperature (°C)',
      },
      {
        label: 'Relative humidity (%)',
        value: 'relative humidity (%)',
      },
      {
        label: 'Wind speed (m/s)',
        value: 'wind speed (m/s)',
      },
      {
        label: 'Wind direction (°)',
        value: 'wind direction (°)',
      },
      {
        label: 'Incoming/downward shortwave radiation (W/m^2)',
        value: 'incoming/downward shortwave radiation (W/m^2)',
      },
      {
        label: 'Snowdepth (m)',
        value: 'snowdepth (m)',
      },
      {
        label: 'Battery power (V)',
        value: 'battery power (V)',
      },
    ],
  },
  {
    label: 'Colour Lake ',
    value: 'colour Lake ',
    children: [
      {
        label: 'Temperature (°C)',
        value: 'temperature (°C)',
      },
      {
        label: 'Relative humidity (%)',
        value: 'relative humidity (%)',
      },
      {
        label: 'Wind speed (m/s)',
        value: 'wind speed (m/s)',
      },
      {
        label: 'Wind direction (°)',
        value: 'wind direction (°)',
      },
      {
        label: 'Incoming/downward shortwave radiation (W/m^2)',
        value: 'incoming/downward shortwave radiation (W/m^2)',
      },
      {
        label: 'Snowdepth (m)',
        value: 'snowdepth (m)',
      },
      {
        label: 'Battery power (V)',
        value: 'battery power (V)',
      },
    ],
  },
  {
    label: 'Crusoe Glacier',
    value: 'crusoe Glacier',
    children: [
      {
        label: 'Temperature (°C)',
        value: 'temperature (°C)',
      },
      {
        label: 'Relative humidity (%)',
        value: 'relative humidity (%)',
      },
      {
        label: 'Wind speed (m/s)',
        value: 'wind speed (m/s)',
      },
      {
        label: 'Wind direction (°)',
        value: 'wind direction (°)',
      },
      {
        label: 'Incoming/downward shortwave radiation (W/m^2)',
        value: 'incoming/downward shortwave radiation (W/m^2)',
      },
      {
        label: 'Snowdepth (m)',
        value: 'snowdepth (m)',
      },
      {
        label: 'Battery power (V)',
        value: 'battery power (V)',
      },
    ],
  },
  {
    label: 'Erratics Island ',
    value: 'erratics Island ',
    children: [
      {
        label: 'Temperature (°C)',
        value: 'temperature (°C)',
      },
      {
        label: 'Relative humidity (%)',
        value: 'relative humidity (%)',
      },
      {
        label: 'Wind speed (m/s)',
        value: 'wind speed (m/s)',
      },
      {
        label: 'Wind direction (°)',
        value: 'wind direction (°)',
      },
      {
        label: 'Incoming/downward shortwave radiation (W/m^2)',
        value: 'incoming/downward shortwave radiation (W/m^2)',
      },
      {
        label: 'Snowdepth (m)',
        value: 'snowdepth (m)',
      },
      {
        label: 'Battery power (V)',
        value: 'battery power (V)',
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
  const [generatedExcuse, setGeneratedExcuse] = useState("");

  const fetchExcuse = (formatValue,fromValue, toValue) => {
    //const numr = 20220423041500
    const dat_t = {
      "TIMESTAMP_F" : fromValue,
      "TIMESTAMP_T" : toValue,
      "List_V" : ["SWTop_Avg","RH_Avg","WindSpd_horiz_ms","TIMESTAMP"]
    }
    Axios.post("http://127.0.0.1:8000/export-csv/000000", dat_t).then((res) => {
      setGeneratedExcuse(res.data.result);
      downloadFile(res.data.result, `${name || defaultName}.${formatValue}`, formatValue);
    });
  };

  const downloadFile = (csv, filename, formatValue) => {
    let blob, extension;

    if (formatValue === "EXCEL") {
      blob = new Blob([csv], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      extension = ".xlsx";
    } else {
      blob = new Blob([csv], { type: "text/csv" });
      extension = ".csv";
    }

    // Remove extension from filename
    const name = filename.replace(/\.[^/.]+$/, "");

    const fullFilename = `${name}${extension}`;

    if (window.navigator.msSaveOrOpenBlob) {
      // IE11
      window.navigator.msSaveBlob(blob, fullFilename);
    } else {
      // Other browsers
      const file = new File([blob], fullFilename, { type: blob.type });
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = fullFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^A-Za-z0-9\-_.@#$%&*<> ]/g, '').slice(0, 30);
    setName(value);
    if (value) {
      setDefaultName(value);
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
    if (cascaderValue.length === 0) {
      alert("Please select at least one option from the cascader.");
      return;
    }
    const nameValue = name || defaultName;
    const formatValue = e.target.querySelector("select").value;
    const fromValue = parseInt(startDate.replace("T", "").replace(/[-:]/g, "") + "00");
    const toValue = parseInt(endDate.replace("T", "").replace(/[-:]/g, "") + "00");
    console.log(
      "Form submitted:",
      nameValue,
      formatValue,
      fromValue,
      toValue,
      cascaderValue,
      generatedExcuse
    );

    const message = `Form submitted:\nName: ${nameValue}\nFile Format: ${formatValue}\nFrom: ${fromValue}\nTo: ${toValue}\nSelected Options: ${cascaderValue.join(", ")}\n${generatedExcuse}`;
    alert(message);
    if (!formatValue) {
      alert("Please select a file format.");
      return;
    }

    if (cascaderValue.length === 0) {
      alert("Please select at least one option from the cascader.");
      return;
    }

    fetchExcuse(formatValue,fromValue, toValue);
  };


  return (
    <>
      <form onSubmit={handleSubmit}>
        <div class="row">
          <div class="column">
            <h1 className="heading1">Export Setting</h1>
              <div class="buttonNav">
                  <p class="cusName">FileName:</p>
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
              <div class="buttonNav">
                  <p class="fileFormat">File Format:</p>
                  <div class="dropDown">
                    <select required>
                      <option value="" disabled selected hidden>
                        Choose preference
                      </option>
                      <option value="CSV">CSV</option>
                      <option value="EXCEL">EXCEL</option>
                    </select>
                  </div>
              </div>
              <div class="buttonNav">
                  <p class="from">From</p>
                  <input
                    type="datetime-local"
                    class="startdate"
                    disabled={isChecked}
                    value={startDate}
                    onChange={handleStartDateChange}
                  />
              </div>
              <div class="buttonNav">
                <p class="to">To</p>
                <input
                  type="datetime-local"
                  class="Enddate"
                  disabled={isChecked}
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </div>
            <Checkbox onChange={handleCheckboxChange} className="ExportAll">Export All</Checkbox>
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
          <button type="submit" className="ExportButton">Click to Export</button>
        </center>
      </form>
    </>
  );
};

export default Export;