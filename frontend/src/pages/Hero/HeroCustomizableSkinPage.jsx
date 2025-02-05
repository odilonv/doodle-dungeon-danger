import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosRounded";
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import html2canvas from 'html2canvas';

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

const accessories = [null, accessory1, accessory2, accessory3];
const faces = [face1, face2, face3, face4];

const skinsCustom = [null, skin1, skin2, skin3, skin4];

export default function HeroCustomizableSkinPage() {
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [selectedFace, setSelectedFace] = useState(face1);
  const [selectedSkin, setSelectedSkin] = useState(skin1);
  const navigate = useNavigate();
  const characterRef = useRef(null);

  const handleAccessoryClick = (accessory) => {
    setSelectedAccessory(accessory);
  };

  const handleFaceClick = (face) => {
    setSelectedFace(face);
  };

  const handleSkinClick = (skin) => {
    setSelectedSkin(skin);
  };

  const handleChooseHeroClick = () => {
    navigate("/choose-your-hero");
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const validateSkin = async () => {
    if (!characterRef.current) return;

    const canvas = await html2canvas(characterRef.current, { backgroundColor: null });
    const dataURL = canvas.toDataURL("image/png");
    localStorage.setItem("characterImage", dataURL);

    navigate("/game");
  };

  return (
    <div style={containerStyle}>
      <div style={backButtonStyle} onClick={handleBackClick}>
        <ArrowBackIosIcon style={backArrowStyle} />
        <span style={backTextStyle}>Back</span>
      </div>

      <h1 style={titleStyle}>
        Customize your
        <br />
        <span style={{ color: "var(--main-color)" }}>doodle hero!</span>
      </h1>

      <div style={customizablePlayerContainer}>
        <div alt="Base" style={skinStyle} />

        <img src={customizablePlayer} alt="Base" style={{
          ...skinStyle,
          zIndex: 1,
          position: "absolute",
          top: 0,
          left: 0,
        }} />
        {selectedSkin && (
          <img
            src={selectedSkin}
            alt="Skin Color"
            style={{
              ...skinStyle,
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 0,
            }}
          />
        )}

        <img
          src={selectedFace}
          alt="Face"
          style={{
            ...skinStyle,
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
          }}
        />

        {selectedAccessory && (
          <img
            src={selectedAccessory}
            alt="Accessory"
            style={{
              ...skinStyle,
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 3,
            }}
          />
        )}
      </div>

      <div style={accessoryPanelStyle}>
        <h2>Select Accessories:</h2>
        <div style={accessoryItemsStyle}>
          {accessories.map((accessory, index) => (
            <div key={index} style={{ position: "relative" }}>
              {accessory ? (
                <img
                  src={accessory}
                  alt={`Accessory ${index}`}
                  style={{
                    ...accessoryItemStyle,
                    paddingTop: '10px'
                  }}
                  onClick={() => handleAccessoryClick(accessory)}
                />
              ) : (
                <div
                  style={accessoryItemStyle}
                  onClick={() => handleAccessoryClick(null)}
                >
                  <RadioButtonUncheckedRoundedIcon style={{ fontSize: "1.5rem" }} />
                </div>
              )}
            </div>
          ))}
        </div>


        <h2>Select Faces:</h2>
        <div style={accessoryItemsStyle}>
          {faces.map((face, index) => (
            <img
              key={index}
              src={face}
              alt={`Face ${index}`}
              style={accessoryItemStyle}
              onClick={() => handleFaceClick(face)}
            />
          ))}
        </div>

        <h2>Select Skin Colors:</h2>
        <div style={accessoryItemsStyle}>
          {skinsCustom.map((skin, index) => (
            <div key={index} style={{ position: "relative" }}>
              {skin ? (
                <img
                  key={index}
                  src={skin}
                  alt={`Skin ${index}`}
                  style={accessoryItemStyle}
                  onClick={() => handleSkinClick(skin)}
                />
              ) : (
                <div
                  style={accessoryItemStyle}
                  onClick={() => handleSkinClick(null)}
                >
                  <RadioButtonUncheckedRoundedIcon style={{ fontSize: "1.5rem" }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>


      <div style={buttonsContainerStyle}>
        <button onClick={handleChooseHeroClick} style={createHeroButtonStyle}>
          <CreateRoundedIcon style={createIconStyle} />
          Create your own hero
        </button>
        <button onClick={validateSkin} style={goToDoodleButtonStyle}>
          Ready ? Go to doodle world :)
        </button>
      </div>
    </div>
  )
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

const customizablePlayerContainer = {
  position: "relative",
  minHeight: "400px",
};

const skinStyle = {
  width: "400px",
  height: "400px",
  objectFit: "contain",
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
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  objectFit: "contain",
  cursor: "pointer",
  border: "2px solid transparent",
  borderRadius: "5px",
  transition: "border-color 0.3s",
  position: "relative",
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

const backArrowStyle = {
  fontSize: "2rem",
  color: "black",
};
