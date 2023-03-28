import React, { useState, useEffect } from "react";
import '../css/AdminPage.css';
import { Link, useNavigate, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Admin = () => {
    
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();

    const [posts, setPosts] = useState([]);
    const { auth } = useAuth();

    let config = {
        headers: {
            'Authorization': 'Bearer ' + auth.accessToken
        }
    }

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

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    const displayUserPost = (posts) => {
        if (!posts.length) return null;
        return posts.map((post, index) => (
            <tr key={index}>
                <td className="adminTable">{index + 1}</td>
                <td className="adminTable">{post.username}</td>
                <td className="adminTable">{post?.roles?.Admin ? 'User, Admin' : 'User'}</td>
            </tr>
        ));
    }

    return (
        <>
            <div className="logoUserProfile">
                <label className="titleUserProfile">Administrator Page</label>
            </div>
            <div className="itemBox">
                <label className="titleItemBox">User List</label>
                <div className="mainUserProfile">
                    <table className="adminWholeTable">
                        <thead>
                            <tr>
                                <th className="adminTableTitle">ID</th>
                                <th className="adminTableTitle">Username</th>
                                <th className="adminTableTitle">Permission</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayUserPost(posts)}
                        </tbody>
                    </table>
                </div>
                <div className="editAdmin">
                    <Link to="/EditAdmin" className="editAdminPage">
                        <button className="secondaryEditAdmin">
                            Edit User Database
                        </button>
                    </Link>
                </div>
                <div className="downloadAdmin">
                    <button className="secondaryDownloadAdmin" onClick={goBack}>
                        User Download Log
                    </button>
                </div>
                <div className="downloadAdmin">
                    <Link to="/DownAdmin" className="editAdminPage">
                        <button className="secondaryDownloadAdmin">
                            User Download Log
                        </button>
                    </Link>
                </div>
                <div className="uploadAdmin">
                    <Link to="/UpAdmin" className="editAdminPage">
                        <button className="secondaryUploadAdmin">
                            Upload Climate Data
                        </button>
                    </Link>
                </div>
            </div>
            <div className="backAdmin">
                <button className="secondaryBackAdmin" onClick={goBack}>
                    Go Back
                </button>
            </div>
        </>
    )
}

export default Admin;