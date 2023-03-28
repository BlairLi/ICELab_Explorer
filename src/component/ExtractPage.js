import React from "react";
/* import ReactDOM from 'react-dom' */
import {useState, useEffect} from "react";
import "../css/ExtractPage.css"
import { Checkbox } from 'antd';
import Axios from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import * as XLSX from 'xlsx';
import useAuth from "../hooks/useAuth";
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
        value: 'Temp_2m_C',
      },
      {
        label: 'Relative humidity (%)',
        value: 'RH_2m_perc',
      },
      {
        label: 'Wind speed (m/s)',
        value: 'WS_3m_ms',
      },
      {
        label: 'Wind direction (°)',
        value: ['WD_3m_deg','WD_3m_stdev'],
      },
      {
        label: 'Incoming/downward shortwave radiation (W/m^2)',
        value: 'SW_in_wm2',
      },
      {
        label: 'Snowdepth (m)',
        value: ['Depth_snow_m_avg','Depth_snow_m_smp'],
      },
    ],
  },
  {
    label: 'White Glacier Melt Zone',
    value: 'white Glacier Melt Zone',
    children: [
      {
        label: 'Temperature (°C)',
        value: 'Temp_2m_C',
      },
      {
        label: 'Relative humidity (%)',
        value: 'RH_2m_perc',
      },
      {
        label: 'Wind speed (m/s)',
        value: 'WS_3m_m',
      },
      {
        label: 'Wind direction (°)',
        value: 'WD_3m_deg',
      },
      {
        label: 'Incoming/downward shortwave radiation (W/m^2)',
        value: 'SW_in_wm2',
      },
      {
        label: 'Outgoing/upward shortwave radiation (W/m^2)',
        value: 'SW_out_wm2',
      },
      {
        label: 'Incoming/downward longwave radiation (W/m^2)',
        value: 'LW_in_wm2',
      },
      {
        label: 'Outgoing/upward longwave radiation (W/m^2)',
        value: 'LW_out_wm2',
      },
      {
        label: 'Distance to ice (m)',
        value: 'Dist_2_Ice_m',
      },
    ],
  },
  {
    label: 'White Glacier Moraine',
    value: 'white Glacier Moraine',
    children: [
      {
        label: 'Temperature (°C)',
        value: 'Temp_2m_C',
      },
      {
        label: 'Relative humidity (%)',
        value: 'RH_2m_perc',
      },
      {
        label: 'Wind speed (m/s)',
        value: 'WS_3m_ms',
      },
      {
        label: 'Wind direction (°)',
        value: ['WD_3m_deg','WD_3m_stdev'],
      },
      {
        label: 'Incoming/downward shortwave radiation (W/m^2)',
        value: 'SW_in_wm2',
      },
      {
        label: 'Snowdepth (m)',
        value: ['Depth_snow_m_avg','Depth_snow_m_smp'],
      },
    ],
  },
  {
    label: 'Colour Lake',
    value: 'colour Lake',
    children: [
      {
        label: 'Temperature (°C)',
        value: 'Temp_2m_C',
      },
      {
        label: 'Relative humidity (%)',
        value: 'RH_2m_perc',
      },
      {
        label: 'Wind speed (m/s)',
        value: 'WS_3m_ms',
      },
      {
        label: 'Wind direction (°)',
        value: 'WD_3m_deg',
      },
      {
        label: 'Incoming/downward shortwave radiation (W/m^2)',
        value: 'SW_in_wm2',
      },
      {
        label: 'Snowdepth (m)',
        value: 'Depth_snow_m',
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
  const [selectedParent, setSelectedParent] = useState(null);
  const [selectedChildren, setSelectedChildren] = useState([]);
  const [generatedExcuse, setGeneratedExcuse] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth()

  useEffect(() => {
    if (isChecked) {
      setStartDate("1970-01-01T00:00");
      setEndDate(`${now.toISOString().slice(0, 11)}${hours}:${minutes}`);
    }
  // eslint-disable-next-line
  }, [isChecked]);

  const fetchExcuse = (dev_id, formatValue, fromValue, toValue, listValue) => {
    const url = "http://127.0.0.1:7000/export-csv";
    const flattenedListValue = listValue.flat();
    const dat_t = {
      "TIMESTAMP_F" : fromValue,
      "TIMESTAMP_T" : toValue,
      "List_V" : flattenedListValue
    }
    //alert(fromValue);
    //alert(JSON.stringify(flattenedListValue));
    //alert(JSON.stringify(dat_t));
    Axios.post(`${url}/${dev_id}`, dat_t).then((res) => {  
      setGeneratedExcuse(res.data.result);
      downloadFile(res.data.result, `${name || defaultName}.${formatValue}`, formatValue);
    });
  };

  const downloadFile = (csv, filename, formatValue) => {
    let blob, extension;
  
    if (formatValue === "EXCEL") {
      // Convert CSV to a 2D array
      const csvArray = csv.split('\n').map(row => row.split(','));
  
      // Create a new workbook
      const workbook = XLSX.utils.book_new();
  
      // Create a new worksheet from the 2D array
      const worksheet = XLSX.utils.aoa_to_sheet(csvArray);
  
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
      // Write the workbook to a binary string
      const binaryString = XLSX.write(workbook, { type: "binary", bookType: "xlsx" });
  
      // Convert the binary string to an ArrayBuffer
      const buffer = new ArrayBuffer(binaryString.length);
      const view = new Uint8Array(buffer);
      for (let i = 0; i < binaryString.length; i++) {
        view[i] = binaryString.charCodeAt(i) & 0xFF;
      }
  
      blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
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

  const handleParentChange = (value) => {
    setSelectedParent(value);
    setSelectedChildren([]);
  };

  const handleChildrenChange = (value) => {
    setSelectedChildren(value);
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

  const updateDownLog = async (nameValue, formatValue) => {
    const url = "/employees";
    if (nameValue === "" || formatValue === "") {
      alert("Needs Filename for Download Log");
    } else {
      try {
        if (nameValue === "") {
          nameValue = "Data";
        }
        const currentTime = `${now.toISOString().slice(0, 11)}${hours}:${minutes}`;
        const queryParams = {
          username: auth.user,
          downlog: 
            {
              fileName: nameValue + '.' + formatValue,
              time: currentTime,
              device: selectedParent,
              _id: false
            }
        };
        // const config = {
        //   headers: {
        //     Authorization: 'Bearer ' + auth.accessToken
        //   }
        // };
        // await axiosPrivate.put(`${url}`, queryParams, config);
        await axiosPrivate.put(`${url}`, queryParams);
        console.log("Download Log has been Updated");
      } catch (err) {
        console.error(err);
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedParent || selectedChildren.length === 0) {
      alert("Please select a parent category and at least one child category from the cascader.");
      return;
    }
    const nameValue = name || defaultName;
    const formatValue = e.target.querySelector("select").value;
    const fromValue = parseInt(startDate.replace("T", "").replace(/[-:]/g, "") );
    const toValue = parseInt(endDate.replace("T", "").replace(/[-:]/g, ""));
    //const listValue = [...selectedChildren, "E_actual_kPa", "Press_hPa"]; 
    let listValue = selectedChildren;
    let dev_id = null;
    if (selectedParent === "white Glacier Nunatak") {
      listValue = [...selectedChildren, "E_actual_kPa", "Press_hPa"];
      dev_id = "000003"
    } else if (selectedParent === "white Glacier Moraine") {
      listValue = [...selectedChildren, "E_actual_kPa", "Press_hPa"];
      dev_id = "000002"
    } else if (selectedParent === "white Glacier Melt Zone") {
      listValue = [...selectedChildren, "Net_SW_wm2", "Net_LW_wm2", "Albedo"];
      dev_id = "000004"
    } else if (selectedParent === "colour Lake") {
      listValue = [...selectedChildren, "Press_hPa"];
      dev_id = "000001"
    }

    console.log(
      "Form submitted:",
      nameValue,
      formatValue,
      fromValue,
      toValue,
      selectedParent,
      selectedChildren,
      listValue,
      generatedExcuse
    );

    const message = `Form submitted:\nName: ${nameValue}\nFile Format: ${formatValue}\nFrom: ${fromValue}\nTo: ${toValue}\nSelected Options: ${selectedParent}${
      selectedChildren.length > 0 ? ` > ${selectedChildren.join(", ")}` : ""
    }\nList of Values: ${listValue}`;
    alert(message);
    
    if (!formatValue) {
      alert("Please select a file format.");
      return;
    }

    fetchExcuse(dev_id, formatValue,fromValue, toValue, listValue);
    updateDownLog(nameValue,formatValue);
  };


  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="column">
            <h1 classNameName="heading1">Export Setting</h1>
              <div className="buttonNav">
                  <p className="cusName">FileName:</p>
                  <label className="custom-field one">
                    <input
                      type="text"
                      placeholder=" "
                      value={name}
                      onChange={handleChange}
                    />
                    <span className="placeholder">Name</span>
                  </label>
              </div>
              <div className="buttonNav">
                  <p className="fileFormat">File Format:</p>
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
              <div className="buttonNav">
                  <p className="from">From</p>
                  <input
                    type="datetime-local"
                    className="startdate"
                    disabled={isChecked}
                    value={startDate}
                    onChange={handleStartDateChange}
                  />
              </div>
              <div className="buttonNav">
                <p className="to">To</p>
                <input
                  type="datetime-local"
                  className="Enddate"
                  disabled={isChecked}
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </div>
            <Checkbox onChange={handleCheckboxChange} className="ExportAll">Export All</Checkbox>
          </div>

          <div className="column">
            <h1 className="heading1">Device Setting</h1>
            <p className="station">Station and variable Setting</p>
            <div className="cascader-container">
              <div className="cascader-parent">
                {climate.map((item) => (
                  <div key={item.value} className="cascader-item">
                    <input
                      type="radio"
                      id={item.value}
                      name="parent"
                      value={item.value}
                      checked={selectedParent === item.value}
                      onChange={() => handleParentChange(item.value)}
                    />
                    <label htmlFor={item.value}>{item.label}</label>
                  </div>
                ))}
              </div>
              {selectedParent && (
                <div className="cascader-children">
                  {climate
                    .find((item) => item.value === selectedParent)
                    .children.map((child) => (
                      <div key={child.value} className="cascader-item">
                        <input
                          type="checkbox"
                          id={child.value}
                          name="children"
                          value={child.value}
                          checked={selectedChildren.includes(child.value)}
                          onChange={(e) =>
                            handleChildrenChange(
                              e.target.checked
                                ? [...selectedChildren, child.value]
                                : selectedChildren.filter(
                                    (val) => val !== child.value
                                  )
                            )
                          }
                        />
                        <label htmlFor={child.value}>{child.label}</label>
                      </div>
                    ))}
                </div>
              )}
            </div>
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