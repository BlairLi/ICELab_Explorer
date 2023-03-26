import React, { useRef, useState, useEffect } from "react";
import '../css/AdminPage.css';
import { useNavigate, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const EditAdmin = () => {
    
    const navigate = useNavigate();
    const location = useLocation();

    const goBack = () => navigate(-1);

    const [user, setUser] = useState('');
    const [posts, setPosts] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    const userRef = useRef();
    const errRef = useRef();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        setErrMsg('');
    }, [user])

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUserInfo = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setPosts(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUserInfo();
        userRef.current.focus();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    const permitUser = async (e) => {
        e.preventDefault();
        let isMounted = true;
        const controller = new AbortController();
        try {
            const response = await axiosPrivate.put('/users', {
                'username': user,
                'roles': {
                    'User': 2001,
                    'Admin': 5150
                }
            }, {
                signal: controller.signal
            });
            if (response.status === 204) {
                setErrMsg(`User ${user} not found`);
            } else {
                setErrMsg(`User ${user} has admin permission`);
            }
            isMounted && setPosts(response.data);
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
        return () => {
            isMounted = false;
            controller.abort();
        }
    }
    
    const deleteUser = async (e) => {
        e.preventDefault();
        let isMounted = true;
        const controller = new AbortController();
        try {
            const response = await axiosPrivate.delete(`/users/${user}`, {
                signal: controller.signal
            });
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
        
        return () => {
            isMounted = false;
            controller.abort();
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