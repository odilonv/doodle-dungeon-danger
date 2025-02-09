import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Divider } from "@mui/material";
import { ButtonComponent, InputComponent, InputPasswordComponent } from '../../components';
import './../../assets/css/pages/login.css';
import { login } from "../../services/API/ApiUser";
import { useNotification } from '../../contexts/NotificationContext';
import { checkIsEmail } from '../../services/utils/ValidateUtils';
import { useUser } from '../../contexts/UserContext';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosRounded";

function LoginPage() {
  const { triggerNotification } = useNotification();
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/");
  };

  const { user, setUser } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const errors = {};
    let isValid = true;

    if (checkIsEmail(email)) {
      errors.email = true;
      isValid = false;
    }

    if (password.length === 0) {
      errors.password = true;
      isValid = false;
    }

    if (isValid) {
      login(email, password)
        .then(response => {
          if (response) {
            setUser(response);
            window.location.href = `/`;
          }
        }).catch(error => {
          triggerNotification(error.message, 'error');
        });
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  }

  const handleForgotPassword = () => {
    navigate('/forgotPassword');
  }

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  });

  return (
    <div className="page">
      <div className="back-button" onClick={handleBackClick}>
        <ArrowBackIosIcon className="back-arrow" />
        <span className="back-text">Back</span>
      </div>
      <div className="login-container default-container">
        <h1 style={{ textAlign: 'center' }}>Login</h1>
        <Divider style={{ margin: '24px 0' }} flexItem />
        <form onKeyDown={handleKeyDown}>
          <div className="form-wrapper">
            <InputComponent
              label="Email"
              value={email}
              setValue={(value) => setEmail(value)}
              validators={[checkIsEmail]}
            />
            <InputPasswordComponent
              label={'Password'}
              value={password}
              setValue={setPassword}
              validators={[]}
            />
            <div onClick={handleForgotPassword} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Forgot password?</div>
            <ButtonComponent onClick={handleLogin} type={'submit'} text={'Login'} />
          </div>
        </form>
        <Divider style={{ margin: '24px 0' }} />
        <p className="form-hint"><span style={{ opacity: 0.5 }}>Don't have an account yet?</span> &nbsp;
          <a className="form__link" href="/signUp" style={{ textDecoration: 'underline' }}>Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
