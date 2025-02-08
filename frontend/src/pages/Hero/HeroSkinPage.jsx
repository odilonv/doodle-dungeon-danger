import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIosRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import { UserContext, HeroContext } from "../../contexts";

const presetSkins = ["sprites/characters/Player_1.png", "sprites/characters/Player_2.png", "sprites/characters/Player_3.png"];
const accessories = [null, "sprites/characters/custom/accessory/Accessory_1.png", "sprites/characters/custom/accessory/Accessory_2.png", "sprites/characters/custom/accessory/Accessory_3.png"];
const faces = ["sprites/characters/custom/face/Face_1.png", "sprites/characters/custom/face/Face_2.png", "sprites/characters/custom/face/Face_3.png", "sprites/characters/custom/face/Face_4.png"];
const skinsCustom = [null, "sprites/characters/custom/skin/Skin_1.png", "sprites/characters/custom/skin/Skin_2.png", "sprites/characters/custom/skin/Skin_3.png", "sprites/characters/custom/skin/Skin_4.png"];
const base = "sprites/characters/custom/Base.png";

export default function HeroSkinPage() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [selectedSkinIndex, setSelectedSkinIndex] = useState(0);
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [selectedFace, setSelectedFace] = useState(faces[1]);
  const [selectedSkin, setSelectedSkin] = useState(skinsCustom[1]);
  const characterRef = useRef(null);
  const { setHero } = useContext(HeroContext);

  const nextSkin = () => setSelectedSkinIndex((prev) => (prev + 1) % presetSkins.length);
  const prevSkin = () => setSelectedSkinIndex((prev) => (prev - 1 + presetSkins.length) % presetSkins.length);

  const handleBackClick = () => navigate("/");
  const handleToggleCustomize = () => setIsCustomizing(!isCustomizing);

  const validateSkin = async () => {
    const heroData = {
      name: "Hero 1",
      userId: user.id,
      avatar: isCustomizing
        ? { skin: selectedSkin, face: selectedFace, accessory: selectedAccessory, body: base }
        : { skin: null, face: null, accessory: null, body: presetSkins[selectedSkinIndex] },
    };

    try {
      const response = await fetch("http://localhost:5002/heroes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(heroData),
        credentials: "include",
      });

      if (response.ok) {
        const newHero = await response.json();
        setHero(newHero);
        navigate("/dungeons");
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
        {isCustomizing ? "Customize your" : "Choose a basic"}
        <br />
        <span style={{ color: "var(--main-color)" }}>doodle hero!</span>
      </h1>

      <div className="skin-container">
        {isCustomizing ? (
          <div ref={characterRef} className="customizable-player-container">
            <div alt="Base" className="skin" />
            <img src={base} alt="Base" className="skin" style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }} />
            {selectedSkin && <img src={selectedSkin} alt="Skin" className="skin" style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }} />}
            <img src={selectedFace} alt="Face" className="skin" style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }} />
            {selectedAccessory && <img src={selectedAccessory} alt="Accessory" className="skin" style={{ position: "absolute", top: 0, left: 0, zIndex: 3 }} />}
          </div>
        ) : (
          <>
            <ArrowBackIosIcon className="arrow" onClick={prevSkin} />
            <img src={presetSkins[selectedSkinIndex]} alt="Skin" className="skin" />
            <ArrowForwardIosIcon className="arrow" onClick={nextSkin} />
          </>
        )}
      </div>

      {isCustomizing && (
        <div className="accessory-panel">
          <h2>Select Accessories:</h2>
          <div className="accessory-items">
            {accessories.map((acc, idx) => (
              <div key={idx} onClick={() => setSelectedAccessory(acc)} className="accessory-item">
                {acc ? <img src={acc} alt={`Accessory ${idx}`} className="sub-accessory-item" /> : <RadioButtonUncheckedRoundedIcon />}
              </div>
            ))}
          </div>

          <h2>Select Faces:</h2>
          <div className="accessory-items">
            {faces.map((face, idx) => (
              <img key={idx} src={face} alt={`Face ${idx}`} className="accessory-item" onClick={() => setSelectedFace(face)} />
            ))}
          </div>

          <h2>Select Skin Colors:</h2>
          <div className="accessory-items">
            {skinsCustom.map((skin, idx) => (
              <div key={idx} onClick={() => setSelectedSkin(skin)} className="accessory-item">
                {skin ? <img src={skin} alt={`Skin ${idx}`} className="sub-accessory-item" /> : <RadioButtonUncheckedRoundedIcon />}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="buttons-container">
        <button onClick={handleToggleCustomize} className="create-hero-button">
          <CreateRoundedIcon className="create-icon" />
          {isCustomizing ? "Choose from presets" : "Create your own hero"}
        </button>
        <button onClick={validateSkin} className="go-to-doodle-button">
          Ready? Go to doodle world :)
        </button>
      </div>
    </div>
  );
}
