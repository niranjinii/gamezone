import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

// Enable credentials globally
axios.defaults.withCredentials = true;

// Example: Set the base URL if needed
axios.defaults.baseURL = "http://localhost:8080"; // Replace with your backend URL
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
