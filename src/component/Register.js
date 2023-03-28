import '../css/Login.css';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from "../api/axios";

const Register = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [confpwd, setConfpwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
      setErrMsg('');
  }, [user, pwd, confpwd])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (confpwd !== pwd) {
        setErrMsg('Two passwords do not match');
        errRef.current.focus();
      } else {
        await axios.post('/register',
          JSON.stringify({ user, pwd }),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        );
        setUser('');
        setPwd('');
        setConfpwd('');
        navigate(-1);
      }
      // console.log(JSON.stringify(response?.data));
      // console.log(JSON.stringify(response));
      // console.log("Role is", roles);

      // setSuccess(true);
      // navigate to the place before login account
    } catch (err) {
      // console.log(err)
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Register Failed');
        }
        errRef.current.focus();
    }
}

  return (
    <>
      <div className="App">
        <Link to="/" className="logoLogin">
          <label className="bluePart">ICELab </label>
          <label className="blackPart">Queen's</label>
        </Link>
        <div className="main">
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <label className="login">REGISTER</label>
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Username</label>
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
            </div>
            <div className="input-group">
              <label htmlFor="password">Confirm Password</label>
              {/* <input type="password" name="password" placeholder="Password"/> */}
              <input
                type="password"
                id="password"
                onChange={(e) => setConfpwd(e.target.value)}
                value={confpwd}
                required
                placeholder="Please Input Password Again"
              />
            </div>
            <button className="primary">ENTER</button>
          </form>
          <div className="register">
          <label htmlFor="noAccount">Have an account?</label>
            <Link to="/Login" className="registerPage">
              <button className="secondary">
                Login Page
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

export default Register;