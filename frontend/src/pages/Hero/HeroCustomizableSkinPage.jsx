import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosRounded";
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import html2canvas from 'html2canvas';
import { UserContext } from "../../contexts";

const accessories = [null, "sprites/characters/custom/accessory/Accessory_1.png", "/sprites/characters/custom/accessory/Accessory_2.png", "sprites/characters/custom/accessory/Accessory_3.png"];
const faces = ["sprites/characters/custom/face/Face_1.png", "sprites/characters/custom/face/Face_2.png", "sprites/characters/custom/face/Face_3.png", "sprites/characters/custom/face/Face_4.png"];
const skinsCustom = [null, "sprites/characters/custom/skin/Skin_1.png", "sprites/characters/custom/skin/Skin_2.png", "sprites/characters/custom/skin/Skin_3.png", "sprites/characters/custom/skin/Skin_4.png"];

export default function HeroCustomizableSkinPage() {
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [selectedFace, setSelectedFace] = useState(faces[1]);
  const [selectedSkin, setSelectedSkin] = useState(skinsCustom[1]);
  const navigate = useNavigate();
  const characterRef = useRef(null);
  const { user } = useContext(UserContext);

  const customizablePlayer = "sprites/characters/custom/Base.png";

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
    console.log("validateSkin called!");
    console.log(user);
    if (!characterRef.current) {
      console.log("characterRef is null");
      return;
    }

    const canvas = await html2canvas(characterRef.current, { backgroundColor: null, useCORS: true, scale: 2 });
    const dataURL = canvas.toDataURL("image/png");

    const heroData = {
      name: "Hero 1",
      userId: user.id,
      avatar: dataURL,
    };

    try {
      const response = await fetch("http://localhost:5001/heroes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(heroData),
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Hero created successfully:", result);
        navigate("/dungeon-1");
      } else {
        throw new Error("Error creating hero");
      }
    } catch (error) {
      console.error("Error creating hero:", error);
    }
  };

  return (
    <div className="container">
      <div className="back-button" onClick={handleBackClick}>
        <ArrowBackIosIcon className="back-arrow" />
        <span className="back-text">Back</span>
      </div>

      <h1 className="title">
        Customize your
        <br />
        <span style={{ color: "var(--main-color)" }}>doodle hero!</span>
      </h1>

      <div ref={characterRef} className="customizable-player-container">
        <div alt="Base" className="skin" />
        <img src={customizablePlayer} alt="Base" className="skin" style={{ zIndex: 1, position: "absolute", top: 0, left: 0 }} />
        {selectedSkin && (
          <img
            src={selectedSkin}
            alt="Skin Color"
            className="skin"
            style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
          />
        )}

        <img
          src={selectedFace}
          alt="Face"
          className="skin"
          style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}
        />

        {selectedAccessory && (
          <img
            src={selectedAccessory}
            alt="Accessory"
            className="skin"
            style={{ position: "absolute", top: 0, left: 0, zIndex: 3 }}
          />
        )}
      </div>

      <div className="accessory-panel">
        <h2>Select Accessories:</h2>
        <div className="accessory-items">
          {accessories.map((accessory, index) => (
            <div key={index} style={{ position: "relative" }}>
              {accessory ? (
                <img
                  src={accessory}
                  alt={`Accessory ${index}`}
                  className="accessory-item"
                  onClick={() => handleAccessoryClick(accessory)}
                />
              ) : (
                <div className="accessory-item" onClick={() => handleAccessoryClick(null)}>
                  <RadioButtonUncheckedRoundedIcon style={{ fontSize: "1.5rem" }} />
                </div>
              )}
            </div>
          ))}
        </div>

        <h2>Select Faces:</h2>
        <div className="accessory-items">
          {faces.map((face, index) => (
            <img
              key={index}
              src={face}
              alt={`Face ${index}`}
              className="accessory-item"
              onClick={() => handleFaceClick(face)}
            />
          ))}
        </div>

        <h2>Select Skin Colors:</h2>
        <div className="accessory-items">
          {skinsCustom.map((skin, index) => (
            <div key={index} style={{ position: "relative" }}>
              {skin ? (
                <img
                  key={index}
                  src={skin}
                  alt={`Skin ${index}`}
                  className="accessory-item"
                  onClick={() => handleSkinClick(skin)}
                />
              ) : (
                <div className="accessory-item" onClick={() => handleSkinClick(null)}>
                  <RadioButtonUncheckedRoundedIcon style={{ fontSize: "1.5rem" }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="buttons-container">
        <button onClick={handleChooseHeroClick} className="create-hero-button">
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
