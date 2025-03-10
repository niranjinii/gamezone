import React, { useState } from "react";
import Login from "./Login";
import styles from "../styles/login-page.module.css";
import bg from "../images/login-bg.jpg";

function LoginCont(props) {
  
  return (
    <div className={styles.container}>
      <div className={styles.loginbox}>
        {!props.isSignUp ? <h2>Login</h2> : <h2>Sign Up</h2>}
        <Login
          change={props.change}
          submit={props.submit}
          username={props.username}
          password={props.password}
          signup={props.isSignUp}
        />
        {!props.isSignUp && (
          <button type="button" onClick={()=>{
            props.signup()
          }}>
            Sign Up
          </button>
        )}
        {!props.isSignUp && (
          <p className={styles.signuptext}>
            Make sure to sign up if you don't have an account!
          </p>
        )}
      </div>
      <img src={bg} alt="Background" className={styles.img} />
    </div>
  );
}

export default LoginCont;
