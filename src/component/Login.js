import '../css/Login.css';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from "../api/axios";
const LOGIN_URL = '/auth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { setAuth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
      setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(LOGIN_URL,
            JSON.stringify({ user, pwd }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        // console.log(JSON.stringify(response?.data));
        // console.log(JSON.stringify(response));
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({ user, pwd, roles, accessToken });
        setUser('');
        setPwd('');
        // setSuccess(true);
        // navigate to the place before login account
        navigate(from, { replace: true });
    } catch (err) {
      // console.log(err)
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
        }
        errRef.current.focus();
    }
}

  // const handleClick = e => {
  //   e.preventDefault();

  //   alert("Goes to registration page");
  // };

  return (
    <>
    <div className="App">
      <Link to="/" className="logoLogin">
        <label className="bluePart">ICELab </label>
        <label className="blackPart">Queen's</label>
      </Link>
      <div className="main">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <label className="login">LOGIN</label>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">User Name</label>
            {/* <input type="email" name="email" placeholder="Email address / Username" /> */}
            <input
                          type="text"
                          id="username"
                          ref={userRef}
                          autoComplete="off"
                          onChange={(e) => setUser(e.target.value)}
                          value={user}
                          required
                          placeholder="User Name"
                      />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            {/* <input type="password" name="password" placeholder="Password"/> */}
            <input
                          type="password"
                          id="password"
                          onChange={(e) => setPwd(e.target.value)}
                          value={pwd}
                          required
                          placeholder="Password"
                      />
            {/* <label className="forgot">Forgot your <a href="https://www.google.com/" class="findPassword">password</a>?</label> */}
          </div>
          <button className="primary">ENTER</button>
        </form>
        <div className="register">
          <label htmlFor="noAccount">Don't have an account?</label>
          <Link to="/Register" className='registerPage'>
            <button className="secondary">
              REGISTER
            </button>
          </Link>
        </div>
      </div>
      <div className="moreInfo">
        <div className="info">
          <a href="https://www.google.com/" className="part">About Us</a>
          <a href="https://www.google.com/" className="part">Service</a>
          <a href="https://www.google.com/" className="part">Terms</a>
          <a href="https://www.google.com/" className="part">Partnership</a>
          <a href="https://www.google.com/" className="part">Contact</a>
          <a href="https://www.google.com/" className="lastPart">Project</a>
        </div>
      </div> 
    </div>
    </>
  );
}

export default Login;
