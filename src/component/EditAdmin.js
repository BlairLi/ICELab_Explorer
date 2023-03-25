import React, { useRef, useState, useEffect } from "react";
import '../css/AdminPage.css';
import { json, useNavigate } from "react-router-dom"
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const EditAdmin = () => {
    
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    const [user, setUser] = useState('');
    const [posts, setPosts] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    const { auth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();
    const axiosPrivate = useAxiosPrivate();


    let config = {
        headers: {
            'Authorization': 'Bearer ' + auth.accessToken
        }
    }

    useEffect(() => {
        getUserInfo()
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user])

    const getUserInfo = () => {
        axios.get('/users', config)
            .then((response) => {
                const data = response.data;
                setPosts(data);
                console.log('Data has been received!');
            })
            .catch(() => {
                alert('Error retrieving data!');
            })
    }

    const permitUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('/users', {
                'username': user,
                'roles': {
                    'User': 2001,
                    'Admin': 5150
                }
            }, config);
            if (response.status === 204) {
                setErrMsg(`User ${user} not found`);
            } else {
                setErrMsg(`User ${user} has admin permission`);
            }
            errRef.current.focus();
        }catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Edit Failed');
            }
            errRef.current.focus();
        }
    }
    
    const deleteUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`/users/${user}`, config);
            if (response.status === 204) {
                setErrMsg(`User ${user} not found`);
            } else {
                setErrMsg(`User ${user} has been removed`);
            }
            errRef.current.focus();
        }catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Edit Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            <div className="logoUserProfile">
                <label className="titleUserProfile">Administrator Page</label>
            </div>
            <div className="itemBoxEdit">
                <label className="titleItemBoxEdit">Find a User</label>
                <p ref={errRef} className={errMsg ? "errmsgAdmin" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <form className="mainUserProfileEdit">
                    <label htmlFor="usernameAdmin">Username</label>
                    <div className="infoBox">
                        {/* <input type="email" name="email" placeholder="Email address / Username" /> */}
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            placeholder="Username"
                        />
                    </div>
                    <div className="permitAdmin">
                        <button className="secondaryPermitAdmin" onClick={permitUser}>
                            Assign Permission
                        </button>
                    </div>
                    <div className="deleteAdmin">
                        <button className="secondaryDeleteAdmin" onClick={deleteUser}>
                            Delete This User
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