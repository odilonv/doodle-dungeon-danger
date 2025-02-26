import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Backdrop } from '@mui/material';
import { ButtonComponent, InputComponent, PasswordCreationComponent } from '../../components';
import { login, signUp } from "../../services/API/ApiUser";
import { useNotification } from '../../contexts/NotificationContext';
import { checkPassword, checkIsEmail, checkOnlyAlphabets } from '../../services/utils/ValidateUtils';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosRounded";
import HomeIcon from "@mui/icons-material/HomeRounded";
import { UserContext } from '../../contexts/UserContext';

function SignUpPage() {
    const { triggerNotification } = useNotification();
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleBackClick = () => {
        navigate("/login");
    };

    const handleHomeClick = () => {
        navigate("/");
    };

    const [user, setUserData] = useState({
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
            if (response.status === 201) {
                triggerNotification('Sign-up successful', 'success');
                login(user.email, user.password)
                    .then(response => {
                        if (response) {
                            setUser(response);
                            window.location.href = `/`;
                        }
                    }).catch(error => {
                        triggerNotification(error.message, 'error');
                    });
                navigate('/home');
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
            <div className="back-button" onClick={handleBackClick}>
                <ArrowBackIosIcon className="back-arrow" />
                <span className="back-text">Back</span>
            </div>
            <div className="home-button" onClick={handleHomeClick}>
                <HomeIcon className="home-icon" />
                <span className="home-text">Home</span>
            </div>
            <div className="login-container default-container">
                <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
                <form style={{ minWidth: '100%' }}>
                    <div className="form-wrapper">
                        <InputComponent
                            label="Last Name"
                            validators={[checkOnlyAlphabets]}
                            value={user.lastName}
                            setValue={(value) => setUserData({ ...user, lastName: value })}
                        />
                        <InputComponent
                            label="First Name"
                            validators={[checkOnlyAlphabets]}
                            value={user.firstName}
                            setValue={(value) => setUserData({ ...user, firstName: value })}
                        />
                        <InputComponent
                            label="Email"
                            validators={[checkIsEmail]}
                            value={user.email}
                            setValue={(value) => setUserData({ ...user, email: value })}
                        />
                        <PasswordCreationComponent
                            password={user.password}
                            confirmPassword={user.confirmPassword}
                            setPassword={(value) => setUserData({ ...user, password: value })}
                            setConfirmPassword={(value) => setUserData({ ...user, confirmPassword: value })}
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

export default SignUpPage;
