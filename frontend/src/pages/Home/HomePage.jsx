import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { UserContext } from "../../contexts";

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [hasSavedGame, setHasSavedGame] = useState(false);

  useEffect(() => {
    const savedGame = localStorage.getItem("savedGame");
    setHasSavedGame(!!savedGame);
  }, []);

  const startNewGame = () => {
    localStorage.setItem("savedGame", JSON.stringify({ level: 1, score: 0 }));
    // navigate("/dungeons");
    navigate("/choose-your-hero");
  };

  const continueGame = () => {
    if (user && hasSavedGame) {
      navigate("/game");
    }
  };

  const handleLoginClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/user");
    }
  };

  return (
    <div className="container">
      <h1 className="title">
        Welcome to
        <br />
        <span style={{ color: "var(--main-color)" }}>Doodle Dungeon Danger</span>
      </h1>

      <div className="content-container">
        <img src='sprites/characters/Player_1.png' alt="Player" className="image" />

        <div className="button-container">
          <button onClick={startNewGame} className="button">
            Create a new Game
          </button>
          <button
            onClick={continueGame}
            disabled={!user || !hasSavedGame}
            className={!user || !hasSavedGame ? "disabled-button" : "button"}
          >
            Continue
          </button>
        </div>

        <img src='sprites/characters/Monster_1.png' alt="DogMan" className="image" />
      </div>

      <div className="login-box" onClick={handleLoginClick}>
        <span className="login-text">{user ? user.firstName : "Log In"}</span>
        <PersonRoundedIcon className="icon" />
      </div>
    </div>
  );
}
