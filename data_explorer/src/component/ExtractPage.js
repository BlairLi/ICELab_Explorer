import React from "react";
import Select from "react-select";
import "../css/ExtractPage.css"

const Export = () => {
    const options = [
        { value: 'CSV', label: 'CSV' },
        { value: 'EXCEL', label: 'EXCEL' },
      ]
      
    return (
        <div className="exp">
            <h1>Export Setting</h1>

            <div class="Cname">
                <strong>Name:</strong>
                <label class="custom-field one">
                    <input type="text" placeholder=" "/>
                    <span class="placeholder">Name</span>
                </label>
            </div>
            
            <div>
                <p class="Fileformat" >
                    File Format:
                </p>
                <Select className="fileClass" options={options} />
            </div>

            <div>
                <p class="From">
                    From
                </p>
                <input type="date" class="startdate"/>
            </div>
            <div>
                <p class="To">
                    To
                </p>
                <input type="date" class="Enddate"/>
            </div>
            
            <p class="Deviceset">
                Device Setting
            </p>
        </div>
    );
};

export default Export;