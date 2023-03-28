import React, { useRef, useState, useEffect } from "react";
import '../css/AdminPage.css';
import { json, useNavigate } from "react-router-dom"
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import * as XLSX from 'xlsx';

const EditAdmin = () => {
    
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    const [user, setUser] = useState('');
    const [posts, setPosts] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    const [download, setDownload] = useState(false);
    const [output, setOutput] = useState('export');
    const { auth } = useAuth();
    const userRef = useRef();
    const outRef = useRef();
    const errRef = useRef();

    let config = {
        headers: {
            'Authorization': 'Bearer ' + auth.accessToken
        }
    }

    useEffect(() => {
        userRef.current.focus();
        outRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user])

    useEffect(() => {
        if (download && posts.length > 0) {
            const fileType =
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const fileExtension = '.xlsx';

            const wb = XLSX.utils.book_new();

            const ws = XLSX.utils.json_to_sheet(posts);

            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

            const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

            const downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(new Blob([buffer], { type: fileType }));
            downloadLink.setAttribute('download', output + fileExtension);
            document.body.appendChild(downloadLink);
            downloadLink.click();

            setDownload(false);
            setPosts([]);
        }
    }, [download, posts])

    const getDownloadInfo = async () => {
        await axios.get(`/employees/${user}`, config)
            .then((response) => {
                if (response.status === 204) {
                    setErrMsg(`User ${user} not found`);
                } else {
                    const data = response.data;
                    setPosts(data);
                    setErrMsg('Download log has been sent!');
                    errRef.current.focus();
                }
            })
            .catch(() => {
                setErrMsg('Error sending data!');
                errRef.current.focus();
            })
    }

    

    const exportToExcel = (e) => {
        e.preventDefault();
        if (user !== '') {
            getDownloadInfo();
            setDownload(true);
        } else {
            setErrMsg('No Username');
            errRef.current.focus();
        }
    };

    return (
        <>
            <div className="logoUserProfile">
                <label className="titleUserProfile">Administrator Page</label>
            </div>
            <div className="itemBoxEdit">
                <label className="titleItemBoxEdit">Find a User</label>
                <p ref={errRef} className={errMsg ? "errmsgAdmin" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <form className="mainUserProfileDown">
                    <label htmlFor="usernameAdmin">Username</label>
                    <div className="infoBox">
                        {/* <input type="email" name="email" placeholder="Email address / Username" /> */}
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => {setUser(e.target.value); setOutput(e.target.value);}}
                            value={user}
                            required
                            placeholder="Username"
                        />
                    </div>
                    <label htmlFor="usernameAdmin">Output Filename</label>
                    <div className="infoBox">
                        {/* <input type="email" name="email" placeholder="Email address / Username" /> */}
                        <input
                            type="text"
                            id="output"
                            ref={outRef}
                            autoComplete="off"
                            onChange={(e) => setOutput(e.target.value)}
                            value={output}
                            required
                            placeholder="Output Filename"
                        />
                    </div>
                    <div className="downAdmin">
                        <button className="secondaryDownAdmin" onClick={exportToExcel}>
                            Download One User
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

export default EditAdmin;