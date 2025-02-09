import React from 'react';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useNavigate } from 'react-router-dom';

function VictoryPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div style={pageContainerStyle}>
      <div style={pageHeaderStyle}>
        <h1 style={pageTitleStyle}>Victory!</h1>
      </div>
      <div style={pageBodyStyle}>
        <h2>You have conquered the dungeon!</h2>
        <div style={pageButtonBoxStyle} onClick={handleGoBack}>
          <span style={pageButtonTextStyle}>Back to menu</span>
          <ArrowForwardIosRoundedIcon style={pageButtonIconStyle} />
        </div>
      </div>
    </div>
  );
}

const pageContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#D4EDDA",
  color: "#155724",
  textAlign: "center",
};

const pageHeaderStyle = {
  marginBottom: "2rem",
};

const pageTitleStyle = {
  fontSize: "5rem",
  fontWeight: "bold",
};

const pageBodyStyle = {
  fontSize: "1.5rem",
  marginTop: "2rem",
};

const pageButtonBoxStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "2rem",
  width: "250px",
  padding: "10px 15px",
  backgroundColor: "#28A745",
  border: "2px solid #155724",
  borderRadius: "10px",
  cursor: "pointer",
  color: "white",
};

const pageButtonTextStyle = {
  fontSize: "1.2rem",
  fontWeight: "bold",
};

const pageButtonIconStyle = {
  fontSize: "1.8rem",
  color: "white",
  marginLeft: "10px",
};

export default VictoryPage;
