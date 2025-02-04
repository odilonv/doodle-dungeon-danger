import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EditIcon from "@mui/icons-material/Edit";

// Customizable player skin
import accessory1 from "../../assets/sprites/characters/custom/accessory/Accessory_1.png";
import accessory2 from "../../assets/sprites/characters/custom/accessory/Accessory_2.png";
import accessory3 from "../../assets/sprites/characters/custom/accessory/Accessory_3.png";

import face1 from "../../assets/sprites/characters/custom/face/Face_1.png";
import face2 from "../../assets/sprites/characters/custom/face/Face_2.png";
import face3 from "../../assets/sprites/characters/custom/face/Face_3.png";
import face4 from "../../assets/sprites/characters/custom/face/Face_4.png";

import skin1 from "../../assets/sprites/characters/custom/skin/Skin_1.png";
import skin2 from "../../assets/sprites/characters/custom/skin/Skin_2.png";
import skin3 from "../../assets/sprites/characters/custom/skin/Skin_3.png";
import skin4 from "../../assets/sprites/characters/custom/skin/Skin_4.png";

import customizablePlayer from "../../assets/sprites/characters/custom/Base.png";

// Other player skins
import player1 from "../../assets/sprites/characters/Player_1.png";
import player2 from "../../assets/sprites/characters/Player_2.png";
import player3 from "../../assets/sprites/characters/Player_3.png";


// Skins disponibles
const skins = [player1, player2, player3, customizablePlayer];
const accessories = [accessory1, accessory2, accessory3];

export default function HeroSkinPage() {
  const [selectedSkinIndex, setSelectedSkinIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAccessory, setSelectedAccessory] = useState(null);
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

  const handleEditClick = () => {
    setIsEditing(!isEditing); // Toggle editing mode
  };

  const handleAccessoryClick = (accessory) => {
    setSelectedAccessory(accessory); // Update selected accessory
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
        <div style={customizablePlayerContainer}>
          <img
            src={skins[selectedSkinIndex]}
            alt="Skin"
            style={skinStyle}
          />
          {selectedSkinIndex === 3 && ( // If the selected skin is customizable
            <div style={editIconStyle} onClick={handleEditClick}>
              <EditIcon style={editIconButtonStyle} />
            </div>
          )}
          {selectedAccessory && (
            <img
              src={selectedAccessory}
              alt="Accessory"
              style={accessoryStyle}
            />
          )}
        </div>
        <ArrowForwardIosIcon style={arrowStyle} onClick={nextSkin} />
      </div>

      {/* Accessory panel, shown when editing */}
      {isEditing && (
        <div style={accessoryPanelStyle}>
          <h2>Select Accessories:</h2>
          <div style={accessoryItemsStyle}>
            {accessories.map((accessory, index) => (
              <img
                key={index}
                src={accessory}
                alt={`Accessory ${index}`}
                style={accessoryItemStyle}
                onClick={() => handleAccessoryClick(accessory)}
              />
            ))}
          </div>
        </div>
      )}

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

const customizablePlayerContainer = {
  position: "relative",
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

const editIconStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  cursor: "pointer",
};

const editIconButtonStyle = {
  fontSize: "2rem",
  color: "black",
};

const accessoryStyle = {
  position: "absolute",
  top: "10px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "80px", // Adjust size of accessory
  height: "80px",
};

const accessoryPanelStyle = {
  position: "absolute",
  right: "20px",
  top: "20px",
  backgroundColor: "white",
  padding: "20px",
  boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
  borderRadius: "10px",
  width: "250px",
  zIndex: 100,
};

const accessoryItemsStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "10px",
};

const accessoryItemStyle = {
  width: "60px",
  height: "60px",
  objectFit: "contain",
  cursor: "pointer",
  border: "2px solid transparent",
  borderRadius: "5px",
  transition: "border-color 0.3s",
};

const accessoryItemStyleHover = {
  borderColor: "var(--main-color)",
};

