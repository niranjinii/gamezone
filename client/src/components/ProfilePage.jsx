import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Settings from "./Settings";
import Alert from "./Alert";
import HomeIcon from "./HomeIcon";
import styles from "../styles/profile-page.module.css";
import temp from "../images/profile.jpg";
import axios from "axios";

function ProfilePage() {
  const [selectedIcon, setSelectedIcon] = useState(temp);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [points, setPoints] = useState(0);
  const [isAlert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [deleteProf, setDeleteProf] = useState(false);

  const navigate = useNavigate();

  const handleIconSelect = (iconPath) => {
    setSelectedIcon(iconPath);
  };

  useEffect(() => {
    // Fetch user profile data
    axios
      .get("http://localhost:8080/api/profile", { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        const { _id, username, email, points, avatarImg } = response.data;
        setUsername(username);
        setEmail(email);
        setPoints(points);
        setUserId(_id);
        setSelectedIcon(avatarImg || temp); // Default to temp image if no avatar
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          navigate("/access-denied");
        }
      });
  }, [navigate]);

  // Save changes function
  const handleSaveChanges = (newUsername, newEmail, newPassword, avatarImg) => {
    // Update profile info (username, email, avatar)
    axios
      .put(
        "http://localhost:8080/api/update-profile",
        {
          username: newUsername,
          email: newEmail,
          avatarImg: selectedIcon,
        },
        { withCredentials: true }
      )
      .then(() => {
        setAlertMessage("Profile has been updated successfully!");
        setAlertTitle("Success!");
        setAlert(true);
      })
      .catch((error) => handleError(error));
  };

  const handleError = (error) => {
    if (error.response) {
      const errorMessage = error.response.data.message;
      if (error.response.status === 401) {
        alert("Access denied.");
        navigate("/access-denied");
      } else if (error.response.status === 409) {
        setAlertMessage(
          "The username/email chosen already exists! Try using something else."
        );
        setAlertTitle("Error!");
        setAlert(true);
      } else if (error.response.status === 400) {
        setAlertMessage(
          "An error occurred while updating your profile. Please try again!"
        );
        setAlertTitle("Error!");
        setAlert(true);
      } else {
        setAlertMessage(
          "An unexpected error occurred. Please try again later."
        );
        setAlertTitle("Error!");
        setAlert(true);
      }
    }
  };

  function handleLogOut() {
    axios
      .post("http://localhost:8080/api/logout", {}, { withCredentials: true })
      .then((response) => {
        const redirectUrl = response.data.redirect || "/";
        setAlert(true);
        setAlertMessage("Logged out successfully!");
        setAlertTitle("Success!");

        // Redirect after a short delay for user to see the success message
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 1500); // 1.5 seconds delay
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        setAlert(true);
        setAlertMessage("Could not log out, please try again.");
        setAlertTitle("Error!");
      });
  }

  const handleAlertDismiss = () => {
    setAlert(false);
  };

  const handleDelete = async () => {
    try {
      // Send DELETE request to backend
      const response = await axios.delete("http://localhost:8080/api/delete", {
        withCredentials: true,
      });
      if (response.status === 200) {
        // Notify user of successful deletion
        setAlert(true);
        setAlertMessage("Account deleted successfully!");
        setAlertTitle("Success!");

        // Add a small delay before redirecting
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        console.error("Failed to delete profile:", response.data.message);
        setAlert(true);
        setAlertMessage("Could not delete account. Please try again.");
        setAlertTitle("Error!");
      }
    } catch (error) {
      console.error("Error during profile deletion:", error);
      setAlert(true);
      setAlertMessage("Error during profile deletion.");
      setAlertTitle("Error!");
    }
  };

  return (
    <div>
      <ul className={styles["side-list"]}>
        <li>
          <HomeIcon />
        </li>
      </ul>
      <div className={styles.bg}>
        <Sidebar
          selectedIcon={selectedIcon}
          userId={userId}
          handleLogOut={handleLogOut}
        />
        <Settings
          username={username}
          email={email}
          points={points}
          selectedIcon={selectedIcon}
          onSelectIcon={handleIconSelect}
          onSaveChanges={handleSaveChanges}
          setUsername={setUsername}
          setEmail={setEmail}
          handleDelete={handleDelete}
        />
      </div>
      {isAlert && (
        <Alert
          title={alertTitle}
          alertContent={alertMessage}
          clicked={handleAlertDismiss}
        />
      )}
    </div>
  );
}

export default ProfilePage;
