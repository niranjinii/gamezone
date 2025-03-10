import React, { useState, useEffect } from "react";
import LoginCont from "./LoginCont";
import Header from "./Header";
import styles from "../styles/login-page.module.css";
import Alert from "./Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [isFilled, setIsFilled] = useState(true);
  let [isSignUp, setSignUp] = useState(false);
  let [isStatus, setStatus] = useState(false);

  const [inpValue, setInp] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setError] = useState(false);
  const [isValid, setValid] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/check-auth", { withCredentials: true })
      .then((response) => {
        setIsAuthenticated(true);
      })
      .catch((error) => {
        setIsAuthenticated(false);
      });
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setInp((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }
  function handleSignUp() {
    setSignUp(true);
  }
  async function handleSubmit(event) {
    event.preventDefault();

    if (!isSignUp) {
      const { username, password } = inpValue;

      if (username === "" || password === "") {
        setIsFilled(false);
        return;
      }

      axios
        .post(
          "http://localhost:8080/api/login",
          { username, password },
          { withCredentials: true }
        )
        .then((response) => {
          navigate(`${response.data.redirect}`);
        })
        .catch((error) => {
          console.error("Login error:", error);

          if (error.response && error.response.data) {
            if (error.response.status === 404) {
              // If account does not exist (404 error)
              setErrorMessage("Account does not exist.");
              setError(true);
            } else if (error.response.status === 401) {
              // If invalid credentials (401 error)
              setErrorMessage("Invalid credentials.");
              setError(true);
            } else {
              setErrorMessage("An error occurred. Please try again.");
              setError(true);
            }
          } else {
            setErrorMessage("An error occurred. Please try again.");
            setError(true);
          }
        });
    } else if (isSignUp) {
      const { username, password, email } = inpValue;
      console.log(inpValue);
      let avatarImg =
        "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=sorceress&radius=50&backgroundColor=8144DA,FFCD52,52E2FF,FF52C8,CFEF81";
      let points = 0;
      if (username === "" || password === "" || email === "") {
        setIsFilled(false);
        return;
      } else if (
        password.trim().length < 8 ||
        !/\d/.test(password) ||
        username.includes(" ")
      ) {
        setValid(false);
        return;
      }
      axios
        .post(
          "http://localhost:8080/api/signup",
          {
            username,
            email,
            password,
            avatarImg,
            points,
          },
          { withCredentials: true }
        )
        .then((response) => {
          setStatus(true); // Show "Signup successful!" message
          setInp({ username: "", password: "", email: "" }); // Reset form
          setSignUp(false); // Switch back to login
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            setErrorMessage(
              "An account with these credentials already exists."
            );
            setError(true);
          } else {
            console.error("Signup error:", error);
            setErrorMessage("An error occured. Please try again.");
            setError(true);
          }
        });
    }
  }

  function handleClick() {
    setIsFilled(true);
    setStatus(false);
    setError(false);
    setValid(true);
  }

  return (
    <div>
      <Header />
      <div className={styles.bg}>
        <div>
          {isAuthenticated ? (
            <p className={styles["logged-in"]}>
              Looks like you've already logged in! Please log out to use another
              account/ make a new account!
            </p>
          ) : (
            <LoginCont
              change={handleChange}
              submit={handleSubmit}
              signup={handleSignUp}
              isSignUp={isSignUp}
              username={inpValue.username}
              password={inpValue.password}
            />
          )}
        </div>

        {!isFilled && (
          <Alert
            alertContent="Please fill out all fields in the login box."
            title="Alert"
            clicked={handleClick}
          />
        )}
        {isStatus && (
          <Alert
            alertContent="Your account was created successfully! Please login to continue."
            title="Success!"
            clicked={handleClick}
          />
        )}
        {isError && (
          <Alert
            alertContent={errorMessage}
            title="Error"
            clicked={handleClick}
          />
        )}
        {!isValid && (
          <Alert
            alertContent="Please make sure your password is longer than 8 characters and contains at least one numeric character! Also make sure your username does not contain any spaces."
            title="Invalid Format!"
            clicked={handleClick}
          />
        )}
      </div>
    </div>
  );
}

export default LoginPage;
