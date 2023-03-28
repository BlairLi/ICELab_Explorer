import React, { useRef, useState } from "react";
import "../css/AdminPage.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const UpAdmin = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    const [errMsg, setErrMsg] = useState("");
    const outRef = useRef();
    const errRef = useRef();
    let AccessToken = '5944810921251666944';

    const [csvFile, setCsvFile] = useState("");
    const [selectedDeviceId, setSelectedDeviceId] = useState("000001");
  
    const handleFileChange = (e) => {
      e.preventDefault();
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const fileContent = event.target.result;
        const transformedData = transformData(fileContent);
        console.log(transformedData);
        setCsvFile(transformedData);
      };
  
      reader.readAsText(file);
    };
  
    const handleDeviceIdChange = (e) => {
      e.preventDefault();
      setSelectedDeviceId(e.target.value);
    };
    
    function transformData(data) {
      const lines = data.split('\n');
      const headers = lines[0].split(',');
    
      const TIMESTAMPIndex = headers.findIndex(header => header === 'TimeStamp');
      headers[TIMESTAMPIndex] = 'TIMESTAMP';
    
      const newLines = [headers.join(',')];
      for (let i = 1; i < lines.length; i++) {
        const columns = lines[i].split(',');
    
        if (columns.length === headers.length) {
          const timestamp = columns[TIMESTAMPIndex];
          const formattedTimestamp = timestamp.replace(/[-:\s]/g, '');
          columns[TIMESTAMPIndex] = formattedTimestamp;
        }
    
        newLines.push(columns.join(','));
      }
    
      return newLines.join('\n');
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!csvFile || !selectedDeviceId) {
        setErrMsg('Please select a CSV file and a device ID');
        errRef.current.focus();
      } else {

        try {
          const url = "http://Plandatacisc498-env.eba-bxqir2i9.us-east-1.elasticbeanstalk.com/insert_doc";
          let config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + AccessToken
            }
          }
          let data = {
            csv: csvFile
          }
          await Axios.post(`${url}/${selectedDeviceId}`, data, config);
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
                <form className="mainUserProfileDown" onSubmit={handleSubmit}>
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
                            <option value="000001">ColourLake</option>
                            <option value="000002">Moraine</option>
                            <option value="000003">Nunatak</option>
                            <option value="000004">WHEM</option>
                        </select>
                    </div>
                    <input type="file" accept=".csv" onChange={handleFileChange} />
                    <div className="upAdmin">
                        <button className="secondaryUpAdmin" type="submit">
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