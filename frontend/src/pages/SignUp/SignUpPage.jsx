import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Backdrop } from '@mui/material';
import { ButtonComponent, InputComponent, PasswordCreationComponent } from '../../components';
import { signUp } from "../../services/API/ApiUser";
import { useNotification } from '../../contexts/NotificationContext';
import { checkPassword, checkIsEmail, checkOnlyAlphabets } from '../../services/utils/ValidateUtils';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosRounded";
import HomeIcon from "@mui/icons-material/HomeRounded";

function SignUpPage() {
    const { triggerNotification } = useNotification();
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate("/login");
    };

    const handleHomeClick = () => {
        navigate("/");
    };

    const [user, setUser] = useState({
        lastName: '',
        firstName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const validate = () => {
        return checkOnlyAlphabets(user.lastName) === null &&
            checkOnlyAlphabets(user.firstName) === null &&
            checkIsEmail(user.email) === null &&
            checkPassword(user.password) == null && user.password === user.confirmPassword;
    };

    const handleSignUp = async () => {
        if (!validate()) {
            triggerNotification('Please correct the invalid fields.', 'error');
            return;
        }
        setIsLoading(true);
        try {
            const response = await signUp(user.firstName, user.lastName, user.email, user.password);
            console.log(response);
            if (response.status === 201) {
                triggerNotification('Sign-up successful', 'success');
                navigate('/login');
            } else {
                const responseJson = await response.json();
                triggerNotification(responseJson.message, 'error');
            }
        } catch (error) {
            console.error(error);
            triggerNotification('An error occurred', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="page">
            <div style={backButtonStyle} onClick={handleBackClick}>
                <ArrowBackIosIcon style={backArrowStyle} />
                <span style={backTextStyle}>Back</span>
            </div>
            <div style={homeButtonStyle} onClick={handleHomeClick}>
                <HomeIcon style={homeIconStyle} />
                <span style={homeTextStyle}>Home</span>
            </div>
            <div className="login-container default-container">
                <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
                <form style={{ minWidth: '100%' }}>
                    <div className="form-wrapper">
                        <InputComponent
                            label="Last Name"
                            validators={[checkOnlyAlphabets]}
                            value={user.lastName}
                            setValue={(value) => setUser({ ...user, lastName: value })}
                        />
                        <InputComponent
                            label="First Name"
                            validators={[checkOnlyAlphabets]}
                            value={user.firstName}
                            setValue={(value) => setUser({ ...user, firstName: value })}
                        />
                        <InputComponent
                            label="Email"
                            validators={[checkIsEmail]}
                            value={user.email}
                            setValue={(value) => setUser({ ...user, email: value })}
                        />
                        <PasswordCreationComponent
                            password={user.password}
                            confirmPassword={user.confirmPassword}
                            setPassword={(value) => setUser({ ...user, password: value })}
                            setConfirmPassword={(value) => setUser({ ...user, confirmPassword: value })}
                        />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <ButtonComponent onClick={handleSignUp} type={'submit'} text={"Sign Up"}
                            preventValidation={!validate()} />
                    </div>
                </form>
                <Backdrop open={isLoading} style={{ zIndex: 10000 }}>
                    <CircularProgress style={{ color: 'var(--main-color)' }} size={100} />
                </Backdrop>
            </div >
        </div >
    );
}

const backArrowStyle = {
    fontSize: "2rem",
    color: "black",
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

const homeButtonStyle = {
    position: "absolute",
    top: "20px",
    right: "20px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
};

const homeIconStyle = {
    fontSize: "2rem",
    color: "black",
};

const homeTextStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginLeft: "8px",
};

export default SignUpPage;
