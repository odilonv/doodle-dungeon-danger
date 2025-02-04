import React from 'react';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div style={notFoundContainerStyle}>
      <div style={notFoundHeaderStyle}>
        <h1 style={notFoundTitleStyle}>404</h1>
      </div>
      <div style={notFoundBodyStyle}>
        <h2>Page Not Found.</h2>
        <div style={notFoundButtonBoxStyle} onClick={handleGoBack}>
          <span style={notFoundButtonTextStyle}>I'm lost in the doodle world... Oh no!</span>
          <ArrowForwardIosRoundedIcon style={notFoundButtonIconStyle} />
        </div>
      </div>
    </div>
  );
}

const notFoundContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#ffffff",
  color: "black",
  textAlign: "center",
};

const notFoundHeaderStyle = {
  marginBottom: "2rem",
};

const notFoundTitleStyle = {
  fontSize: "6rem",
  fontWeight: "bold",
};

const notFoundBodyStyle = {
  fontSize: "1.5rem",
  marginTop: "2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const notFoundButtonBoxStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "2rem",
  width: "250px",
  padding: "10px 15px",
  backgroundColor: "white",
  border: "2px solid black",
  borderRadius: "10px",
  cursor: "pointer",
  boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
};

const notFoundButtonTextStyle = {
  fontSize: "1.2rem",
  fontWeight: "bold",
};

const notFoundButtonIconStyle = {
  fontSize: "1.8rem",
  color: "black",
  marginLeft: "10px",
};

export default NotFoundPage;
