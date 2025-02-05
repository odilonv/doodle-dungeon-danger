import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIosRounded";
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';

const skins = ["sprites/characters/Player_1.png", "sprites/characters/Player_2.png", "sprites/characters/Player_3.png"];

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

  const handleCreateHeroClick = () => {
    navigate("/custom-your-hero");
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const validateSkin = () => {
    localStorage.setItem("characterImage", skins[selectedSkinIndex]);
    navigate("/dungeon-1");
  };

  return (
    <div style={containerStyle}>
      <div style={backButtonStyle} onClick={handleBackClick}>
        <ArrowBackIosIcon style={backArrowStyle} />
        <span style={backTextStyle}>Back</span>
      </div>

      <h1 style={titleStyle}>
        Choose a basic
        <br />
        <span style={{ color: "var(--main-color)" }}>doodle hero!</span>
      </h1>

      <div style={skinContainerStyle}>
        <ArrowBackIosIcon style={arrowStyle} onClick={prevSkin} />
        <div style={customizablePlayerContainer}>
          <img
            src={skins[selectedSkinIndex]}
            alt="Skin"
            style={skinStyle}
          />
        </div>
        <ArrowForwardIosIcon style={{ ...arrowStyle }} onClick={nextSkin} />
      </div>





      <div style={buttonsContainerStyle}>
        <button onClick={handleCreateHeroClick} style={createHeroButtonStyle}>
          <CreateRoundedIcon style={createIconStyle} />
          Create your own hero
        </button>
        <button onClick={validateSkin} style={goToDoodleButtonStyle}>
          Ready ? Go to doodle world :)
        </button>
      </div>
    </div>
  );
}

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
  minHeight: "400px",
};

const customizablePlayerContainer = {
  position: "relative",
};

const skinStyle = {
  width: "400px",
  height: "400px",
  objectFit: "contain",
  display: "block",
};

const arrowStyle = {
  fontSize: "1.5rem",
  cursor: "pointer",
  color: "black",
};

const buttonsContainerStyle = {
  marginTop: "3rem",
  display: "flex",
  gap: "1rem",
  alignItems: "stretch",
};

const goToDoodleButtonStyle = {
  padding: "1rem 2rem",
  backgroundColor: "var(--main-color)",
  color: "white",
  fontSize: "1.5rem",
  fontWeight: "bold",
  borderRadius: "0.75rem",
  border: "none",
  cursor: "pointer",
  height: "60px",
};

const createHeroButtonStyle = {
  padding: "1rem 2rem",
  backgroundColor: "#FFB400",
  color: "white",
  fontSize: "1.5rem",
  fontWeight: "bold",
  borderRadius: "0.75rem",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  height: "60px",
};


const createIconStyle = {
  fontSize: "1.5rem",
  color: "white",
};


