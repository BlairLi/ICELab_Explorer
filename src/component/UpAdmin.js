import React, { useRef, useState } from "react";
import "../css/AdminPage.css";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const UpAdmin = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    const [errMsg, setErrMsg] = useState("");
    const outRef = useRef();
    const errRef = useRef();
    let AccessToken = '5944810921251666944';

    const [csvFile, setCsvFile] = useState(null);
    const [selectedDeviceId, setSelectedDeviceId] = useState("000000");
  
    const handleFileChange = (e) => {
      setCsvFile(e.target.files[0]);
    };
  
    const handleDeviceIdChange = (e) => {
      setSelectedDeviceId(e.target.value);
    };
  
    const handleSubmit = async () => {
      if (!csvFile || !selectedDeviceId) {
        setErrMsg('Please select a CSV file and a device ID');
        errRef.current.focus();
      } else {
        const formData = new FormData();
        formData.append('csv', csvFile);
    
        try {
          console.log(AccessToken);
          await axios.post(`http://127.0.0.1:7000/insert_doc/${selectedDeviceId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${AccessToken}`,
            },
          });
          setErrMsg("Successfully sent CSV to backend");
  
        } catch (error) {
  
          setErrMsg("Error while uploading CSV");
          console.error('Error while uploading CSV:', error);
        }
        errRef.current.focus();
      }
    };

    return (
        <>
            <div className="logoUserProfile">
                <label className="titleUserProfile">Administrator Page</label>
            </div>
            <div className="itemBoxEdit">
                <label className="titleItemBoxEdit">Find a File</label>
                <p ref={errRef} className={errMsg ? "errmsgAdmin" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <form className="mainUserProfileDown">
                    <label htmlFor="usernameAdmin">Select One Station</label>
                    <div className="infoBox">
                        {/* <input type="email" name="email" placeholder="Email address / Username" /> */}
                        <select
                            id="output"
                            ref={outRef}
                            onChange={handleDeviceIdChange}
                            required
                        >
                            <option value="" disabled>Select an option</option>
                            <option value="000000">White Glacier Nunatak</option>
                            <option value="000001">White Glacier Melt Zone</option>
                            <option value="000002">White Glacier Moraine</option>
                            <option value="000003">Colour Lake</option>
                            <option value="000004">Crusoe Glacier</option>
                            <option value="000005">Erratics Island</option>
                        </select>
                    </div>
                    <input type="file" accept=".csv" onChange={handleFileChange} />
                    <div className="upAdmin">
                        <button className="secondaryUpAdmin" onClick={handleSubmit}>
                            Upload File
                        </button>
                    </div>
                </form>
            </div>
            <div className="backAdmin">
                <button className="secondaryBackAdmin" onClick={goBack}>
                    Go Back
                </button>
            </div>
        </>
    )
}

export default UpAdmin;