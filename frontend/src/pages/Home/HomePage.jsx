import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { UserContext } from "../../contexts";
import monster from '../../assets/sprites/characters/Monster.png';
import player from '../../assets/sprites/characters/Player.png';

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
    navigate("/game");
  };

  const continueGame = () => {
    if (user && hasSavedGame) {
      navigate("/game");
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>
        Welcome to
        <br />
        <span style={{ color: "var(--main-color)" }}>Doodle Dungeon Danger</span>
      </h1>

      <div style={contentContainerStyle}>
        <img src={player} alt="Player" style={imageStyle} />

        <div style={buttonContainerStyle}>
          <button onClick={startNewGame} style={buttonStyle}>
            Create a new Game
          </button>
          <button
            onClick={continueGame}
            disabled={!user || !hasSavedGame}
            style={!user || !hasSavedGame ? disabledButtonStyle : buttonStyle}
          >
            Continuer
          </button>
        </div>

        <img src={monster} alt="Monster" style={imageStyle} />
      </div>

      {/* Rectangle de connexion en bas à droite */}
      <div style={loginBoxStyle} onClick={handleLoginClick}>
        <span style={loginTextStyle}>{user ? user.firstName : "Se connecter"}</span>
        <PersonRoundedIcon style={iconStyle} />
      </div>
    </div>
  );
}

// Styles
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#ffffff",
  color: "black",
  position: "relative",
};

const titleStyle = {
  fontSize: "3rem",
  fontWeight: "bold",
  marginBottom: "3rem",
  textAlign: "center",
};

const contentContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "2rem",
};

const buttonContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  alignItems: "center",
};

const buttonStyle = {
  padding: "1rem 2rem",
  backgroundColor: "var(--main-color)",
  color: "white",
  fontSize: "1.5rem",
  fontWeight: "bold",
  borderRadius: "0.75rem",
  border: "none",
  cursor: "pointer",
};

const disabledButtonStyle = {
  ...buttonStyle,
  backgroundColor: "var(--disabled-color)",
  cursor: "not-allowed",
};

const imageStyle = {
  width: "400px",
  height: "400px",
  objectFit: "contain",
};

const loginBoxStyle = {
  position: "absolute",
  bottom: "20px",
  right: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "200px",
  padding: "10px 15px",
  backgroundColor: "white",
  border: "2px solid black",
  borderRadius: "10px",
  cursor: "pointer",
  boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
};

const loginTextStyle = {
  fontSize: "1.2rem",
  fontWeight: "bold",
};

const iconStyle = {
  fontSize: "1.8rem",
  color: "black",
};
