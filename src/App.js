// App.js
import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Game from "./components/Game/Game";
import Footer from "./components/Footer/Footer";
import LogIn from "./components/LogIn/LogIn";

const App = () => {
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [gameResult, setGameResult] = useState("");

  const handleLoginSuccess = (userId) => {
    setLoggedInUserId(userId);
  };

  const handleRecordGame = async () => {
    // Same record game functionality as before
  };

  console.log("loggedInUserId:", loggedInUserId); // Debugging

  return (
    <div className="app-wrapper">
      <Header />
      <Game />
      <Footer />
    </div>
  );
};

export default App;
