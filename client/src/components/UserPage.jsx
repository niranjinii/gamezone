import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserProfile from "./User";
import styles from "../styles/user-page.module.css";
import Header from "./Header";
import axios from "axios";

function UserPage() {
  const { id } = useParams(); // Extract the user ID from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/user/${id}`, { withCredentials: true }) // Fetch user data from backend
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && (error.response.status === 404 || error.response.status === 400)) {
          navigate("/404"); // Redirect to the 404 page for invalid user ID
        } else {
          console.error("Error fetching user data:", error);
          setError(true); // Set error state for non-404 errors
          setLoading(false);
        }
      });
  }, [id, navigate]); // Add `navigate` to dependency array

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading user data</p>;

  const { username, points, avatarImg } = user;
  function calculateLevel(points) {
    if (points < 200) {
      return "Newbie";
    } else if (points >= 200 && points < 400) {
      return "Beginner";
    } else if (points >= 400 && points < 700) {
      return "Amateur";
    } else if (points >= 700 && points < 1200) {
      return "Intermediate";
    } else if (points >= 1200 && points < 2000) {
      return "Expert";
    } else if (points >= 2000) {
      return "Game Master";
    }
  }
  const achievementLevel = calculateLevel(points);
  return (
    <div>
      <Header />
      <div className={styles.bg}>
        <UserProfile
          username={username}
          points={points}
          achievement={achievementLevel}
          avatar={avatarImg}
        />
      </div>
    </div>
  );
}

export default UserPage;
