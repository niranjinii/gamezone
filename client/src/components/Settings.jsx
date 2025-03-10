import React, { useState, useEffect } from "react";
import { Edit } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import StarRateIcon from "@mui/icons-material/StarRate";
import styles from "../styles/profile-page.module.css";
import temp from "../images/profile.jpg";

const generateAvatarUrl = (seed, backgroundColor) =>
  `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${seed}&radius=50&backgroundColor=${backgroundColor}`;

const seeds = ["sorceress", "knight", "archer", "priestess", "druid"];
const backgroundColors = ["8144DA", "FFCD52", "52E2FF", "FF52C8", "CFEF81"];

function Settings({
  selectedIcon = temp,
  onSelectIcon,
  onSaveChanges,
  handleDelete,
  email: initialEmail,
  username: initialUsername,
  points: totalPoints,
}) {
  const [email, setEmail] = useState(initialEmail || "user@example.com");
  const [username, setUsername] = useState(initialUsername || "username123");
  const [editEmail, setEditEmail] = useState(false);
  const [editUsername, setEditUsername] = useState(false);

  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    setEmail(initialEmail);
    setUsername(initialUsername);
  }, [initialEmail, initialUsername]);

  useEffect(() => {
    const fetchedAvatars = seeds.map((seed, index) =>
      generateAvatarUrl(seed, backgroundColors[index])
    );
    setAvatars(fetchedAvatars);
  }, []);

  const handleSaveChanges = () => {
    onSaveChanges(username, email, selectedIcon);
  };

  return (
    <div className={styles.content}>
      <h2>
        <SettingsIcon style={{ color: "gray", fontSize: "4rem" }} />
        Account Settings
      </h2>
      <form className={styles["profile-form"]}>
        {/* Email Section */}
        <div className={styles["form-group"]}>
          <label className={styles["not-editing"]}>Email Address:</label>
          {editEmail ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEditEmail(false)} // Save and close input on blur
              className={styles["input-field"]}
              autoFocus
            />
          ) : (
            <div className={styles["text-display"]}>
              {email}
              <Edit
                onClick={() => setEditEmail(true)}
                className={styles["edit-icon"]}
              />
            </div>
          )}
        </div>

        {/* Username Section */}
        <div className={styles["form-group"]}>
          <label className={styles["not-editing"]}>Username:</label>
          {editUsername ? (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setEditUsername(false)} // Save and close input on blur
              className={styles["input-field"]}
              autoFocus
            />
          ) : (
            <div className={styles["text-display"]}>
              {username}
              <Edit
                onClick={() => setEditUsername(true)}
                className={styles["edit-icon"]}
              />
            </div>
          )}
        </div>

        {/* Avatar Selection */}
        <div className={styles["form-group"]}>
          <label className={styles["not-editing"]}>Choose Avatar:</label>
          <div className={styles["icon-selection"]}>
            {avatars.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`Avatar ${index}`}
                className={styles["profile-icon"]}
                onClick={() => onSelectIcon(avatar)}
              />
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className={styles["button-container"]}>
          <button
            type="button"
            onClick={handleSaveChanges}
            className={styles["save-button"]}
          >
            Save Changes
          </button>
        </div>
      </form>

      <div className={styles["points-info"]}>
        Total Points:{" "}
        <span>
          <StarRateIcon />
        </span>{" "}
        {totalPoints}
      </div>
      <div className={styles["delete-icon"]}>
        <button
          onClick={() => {
            handleDelete();
          }}
        >
          Delete Profile
        </button>
      </div>
    </div>
  );
}

export default Settings;
