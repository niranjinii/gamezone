import React, { useState } from "react";
import Alert from "./Alert";
import axios from "axios";
import styles from "../styles/feedback-form.module.css";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/feedback", formData, {withCredentials: true}) 
      .then((response) => {
        setSuccessMessage("Thank you for your feedback!");
        setErrorMessage(""); 
        setFormData({
          name: "",
          email: "",
          feedback: "",
        });
      })
      .catch((error) => {
        setErrorMessage("Something went wrong. Please try again later.");
        setSuccessMessage(""); 
      });
  };

  function handleClick(){
    setErrorMessage("");
    setSuccessMessage("");
  }

  return (
    <div className={styles["feedback-form-container"]}>
      <h2 className={styles["feedback-heading"]}>We Value Your Feedback</h2>
      <form className={styles["feedback-form"]} onSubmit={handleSubmit}>
        <label className={styles["form-label"]}>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles["form-input"]}
            required
          />
        </label>
        <label className={styles["form-label"]}>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles["form-input"]}
            required
          />
        </label>
        <label className={styles["form-label"]}>
          Feedback:
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            className={styles["form-textarea"]}
            rows="5"
            required
          ></textarea>
        </label>
        <button type="submit" className={styles["form-button"]}>
          Submit
        </button>
      </form>
      {successMessage && <Alert title="Success!" alertContent={successMessage} clicked={handleClick}/>}
      {errorMessage && <Alert title="Error!" alertContent={errorMessage} clicked={handleClick} />}
    </div>
  );
};

export default FeedbackForm;

