import React from "react";
import styles from "../styles/login-page.module.css";

function Login(props) {
  return (
    <form
      id="loginForm"
      onSubmit={(event) => {
        props.submit(event);
      }}
    >
      <div className={styles.inputbox}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={props.username}
          name="username"
          onChange={(event) => props.change(event)}
        />
      </div>
      {props.signup && (
        <div className={styles.inputbox}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={props.email}
            onChange={(event) => props.change(event)}
          />
        </div>
      )}
      <div className={styles.inputbox}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={props.password}
          name="password"
          onChange={(event) => props.change(event)}
        />
      </div>
      {/* {props.signup &&
      <div className="input-box">
       <label for="confpassword">Confirm Password</label>
        <input
          type="password"
          id="confpassword"
          name="confpassword"
        />
      </div>} */}
      <button type="submit">{props.signup ? "Sign Up" : "Login"}</button>
    </form>
  );
}

export default Login;
