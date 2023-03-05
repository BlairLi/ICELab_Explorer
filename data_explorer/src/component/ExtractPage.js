import React from "react";
/* import ReactDOM from 'react-dom' */
import {useState} from "react";
/* import {Form} from "react-bootstrap"; */
import "../css/ExtractPage.css"
import { Cascader } from 'antd';
import { Checkbox } from 'antd';
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
    const [name] = useState('');   
    const handleSubmit = (e) => {
    
        e.preventDefault();

        console.log(`Form submitted, ${name}`);    
    }
    const [isChecked, setIsChecked] = React.useState(false)
    
    const onChange = (value) => {
      console.log(value);
    };

    return (
        <>
            <div class="row">
                <div class="column">
                    <h1 className="heading1">Export Setting</h1>
                    <div class="cusName">
                        <strong>Name:</strong>
                        <label class="custom-field one">
                            <input type="text" placeholder=" "/>
                            <span class="placeholder">Name</span>
                        </label>
                    </div>

                    <div>
                        <p class="fileFormat">File Format:</p>
                        <div className="dropDown">
                                <select required>    
                                    <option value="" disabled selected hidden>Choose preference</option>
                                    <option value="CSV">CSV</option>
                                    <option value="EXCEL">EXCEL</option>
                                </select> 
                        </div>  
                                    
                    </div>
                    
                    <div>
                        <p class="from">From</p>
                        <input type="datetime-local" class="startdate" disabled={isChecked} dateRef='' />
                    </div>
                    <div>
                        <p class="to">To</p>
                        <input type="datetime-local" class="Enddate" disabled={isChecked} />
                    </div>
                    <Checkbox class='antdCheck' onChange={(e) => setIsChecked(e.target.checked)}>Export All</Checkbox>
                </div>

                <div class="column">
                    <h1 className="heading1">Device Setting</h1>
                    <p class="station">Station and variable Setting</p>
                    <Cascader
                      style={{
                        width: '100%',
                      }}
                      options={climate}
                      onChange={onChange}
                      multiple
                      maxTagCount="responsive"
                    />
                </div>
            </div>
            
            <form onSubmit = {handleSubmit}>
              <center><button class = "export" type = 'submit'>Click to Export</button></center>
            </form>
        </>
    );
};

export default Export;