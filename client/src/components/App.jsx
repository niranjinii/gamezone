import React from "react";
import axios from "axios";
import MainPage from "./MainPage";
import LoginPage from "./LoginPage";
import LeaderboardPage from "./LeaderboardPage";
import AchievementsPage from "./AchievementsPage";
import ProfilePage from "./ProfilePage";
import NotFound from "./NotFound";
import UserPage from "./UserPage";
import AccessDenied from "./AccessDenied";
import TicTacToe from "./tictactoe/TicTacToe";
import Minesweeper from "./minesweeper/Minesweeper";
import MemoryGame from "./memory/MemoryGame";
import Simon from "./simon/Simon";
import { Routes, Route } from "react-router-dom";

function App() {
 
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/wizards-duel" element={<TicTacToe />} />
        <Route path="/dragons-treasure" element={<Minesweeper />} />
        <Route path="/mystic-memories" element={<MemoryGame />} />
        <Route path="/sorcerors-sequence" element={<Simon />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
