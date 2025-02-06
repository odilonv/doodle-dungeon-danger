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
    <div className="container">
      <div className="back-button" onClick={handleBackClick}>
        <ArrowBackIosIcon className="back-arrow" />
        <span className="back-text">Back</span>
      </div>

      <h1 className="title">
        Choose a basic
        <br />
        <span style={{ color: "var(--main-color)" }}>doodle hero!</span>
      </h1>

      <div className="skin-container">
        <ArrowBackIosIcon className="arrow" onClick={prevSkin} />
        <div className="customizable-player-container">
          <img
            src={skins[selectedSkinIndex]}
            alt="Skin"
            className="skin"
          />
        </div>
        <ArrowForwardIosIcon className="arrow" onClick={nextSkin} />
      </div>

      <div className="buttons-container">
        <button onClick={handleCreateHeroClick} className="create-hero-button">
          <CreateRoundedIcon className="create-icon" />
          Create your own hero
        </button>
        <button onClick={validateSkin} className="go-to-doodle-button">
          Ready ? Go to doodle world :)
        </button>
      </div>
    </div>
  );
}
