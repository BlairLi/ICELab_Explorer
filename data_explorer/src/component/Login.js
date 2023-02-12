import React, { Component } from "react";
// import '../css/Login.css';

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    console.log(e.target.email.value);

    if (!e.target.email.value) {
      alert("Email is required");
    } else if (!e.target.email.value) {
      alert("Valid email is required");
    } else if (!e.target.password.value) {
      alert("Password is required");
    } else if (
      e.target.email.value === "me@example.com" &&
      e.target.password.value === "123456"
    ) {
      alert("Successfully logged in");
      e.target.email.value = "";
      e.target.password.value = "";
    } else {
      alert("Wrong email or password combination");
    }
  };

  handleClick = e => {
    e.preventDefault();

    alert("Goes to registration page");
  };

  render() {
    return (
      <div className="App">
        <div className="logo">
          <label className="bluePart">ICELab </label>
          <label className="blackPart">Queen's</label>
        </div>
        <div className="main">
          <label className="login">LOGIN</label>
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email address</label>
              <input type="email" name="email" placeholder="Email address / Username" />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="Password"/>
              <label className="forgot">Forgot your <a href="https://www.google.com/" class="findPassword">password</a>?</label>
            </div>
            <button className="primary">ENTER</button>
          </form>
          <div className="register">
            <label htmlFor="noAccount">Don't have an account?</label>
            <button className="secondary" onClick={this.handleClick}>
              REGISTER
            </button>
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
    );
  }
}

export default Login;
