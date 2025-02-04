import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import dogMan from "../../assets/sprites/characters/DogMan.png";
import player from "../../assets/sprites/characters/Player.png";

// Liste des skins disponibles
const skins = [player, dogMan];

export default function HeroSkinPage() {
  const [selectedSkinIndex, setSelectedSkinIndex] = useState(0);
  const navigate = useNavigate();

  const nextSkin = () => {
    setSelectedSkinIndex((prevIndex) => (prevIndex + 1) % skins.length);
  };

  const prevSkin = () => {
    setSelectedSkinIndex(
      (prevIndex) => (prevIndex - 1 + skins.length) % skins.length
    );
  };

  const validateSkin = () => {
    localStorage.setItem("selectedSkin", skins[selectedSkinIndex]);
    navigate("/game");
  };

  return (
    <div style={containerStyle}>
      {/* Flèche "Back" */}
      <div style={backButtonStyle} onClick={() => navigate("/")}>
        <ArrowBackIosIcon style={backArrowStyle} />
        <span style={backTextStyle}>Back</span>
      </div>

      <h1 style={titleStyle}>
        Choose a
        <br />
        <span style={{ color: "var(--main-color)" }}>doodle skin !</span>
      </h1>

      <div style={skinContainerStyle}>
        <ArrowBackIosIcon style={arrowStyle} onClick={prevSkin} />
        <img src={skins[selectedSkinIndex]} alt="Skin" style={skinStyle} />
        <ArrowForwardIosIcon style={arrowStyle} onClick={nextSkin} />
      </div>

      <button onClick={validateSkin} style={buttonStyle}>
        Go to doodle world :)
      </button>
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

// Flèche "Back"
const backButtonStyle = {
  position: "absolute",
  top: "20px",
  left: "20px",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
};

const backArrowStyle = {
  fontSize: "2rem",
  color: "black",
};

const backTextStyle = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginLeft: "8px",
};

const titleStyle = {
  fontSize: "3rem",
  fontWeight: "bold",
  marginBottom: "3rem",
  textAlign: "center",
};

const skinContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "2rem",
};

const skinStyle = {
  width: "400px",
  height: "400px",
  objectFit: "contain",
};

const arrowStyle = {
  fontSize: "3rem",
  cursor: "pointer",
  color: "black",
};

const buttonStyle = {
  marginTop: "2rem",
  padding: "1rem 2rem",
  backgroundColor: "var(--main-color)",
  color: "white",
  fontSize: "1.5rem",
  fontWeight: "bold",
  borderRadius: "0.75rem",
  border: "none",
  cursor: "pointer",
};
