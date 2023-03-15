import React, { useState, useEffect } from "react";
import '../css/AdminPage.css';
import { useNavigate } from "react-router-dom"
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const Admin = () => {
    
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    const [posts, setPosts] = useState([]);
    const { auth } = useAuth();

    let config = {
        headers: {
            'Authorization': 'Bearer ' + auth.accessToken
        }
    }

    useEffect(() => {
        getUserInfo();
    }, []);

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

    const displayUserPost = (posts) => {
        if (!posts.length) return null;
        return posts.map((post, index) => (
            <tr key={index}>
                <td className="adminTable">{index + 1}</td>
                <td className="adminTable">{post.username}</td>
                <td className="adminTable">{post?.roles?.Admin ? 'Admin' : 'User'}</td>
            </tr>
        ));
    }

    return (
        <>
            <div className="logoUserProfile">
                <label className="titleUserProfile">Check Users Details</label>
            </div>
            <div className="itemBox">
                <div className="mainUserProfile">
                    <table>
                        <tr>
                            <th className="adminTableTitle">ID</th>
                            <th className="adminTableTitle">Username</th>
                            <th className="adminTableTitle">Permission</th>
                        </tr>
                        {displayUserPost(posts)}
                    </table>
                </div>
            </div>
            <div className="back">
                <button className="secondaryBack" onClick={goBack}>
                    Go Back
                </button>
            </div>
        </>
    )
}

export default Admin;