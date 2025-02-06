import React from 'react';
import { InputPasswordComponent } from '../../components';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ClearIcon from '@mui/icons-material/Clear';
import { checkDigit, checkPassword, checkSpecialCharacter, checkUppercase } from '../../services/utils/ValidateUtils';

function PasswordCreationComponent({ password, confirmPassword, setPassword, setConfirmPassword }) {
    const colorValid = '#4b8e4b';
    const colorInvalid = 'rgb(221 70 70)';

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', marginBottom: '8px' }}>
                <div style={{ marginTop: '16px' }}>
                    <InputPasswordComponent
                        label="Password"
                        value={password}
                        setValue={setPassword}
                        validators={[checkPassword]}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '16px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                        {checkUppercase(password) === null ? (
                            <CheckCircleIcon style={{ color: colorValid, marginRight: '5px' }} />
                        ) : (
                            <ClearIcon style={{ color: colorInvalid, marginRight: '5px' }} />
                        )}
                        <span>At least one uppercase letter</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                        {checkSpecialCharacter(password) === null ? (
                            <CheckCircleIcon style={{ color: colorValid, marginRight: '5px' }} />
                        ) : (
                            <ClearIcon style={{ color: colorInvalid, marginRight: '5px' }} />
                        )}
                        <span>At least one special character</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                        {checkDigit(password) === null ? (
                            <CheckCircleIcon style={{ color: colorValid, marginRight: '5px' }} />
                        ) : (
                            <ClearIcon style={{ color: colorInvalid, marginRight: '5px' }} />
                        )}
                        <span>At least one digit</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                        {password.length >= 8 ? (
                            <CheckCircleIcon style={{ color: colorValid, marginRight: '5px' }} />
                        ) : (
                            <ClearIcon style={{ color: colorInvalid, marginRight: '5px' }} />
                        )}
                        <span>Minimum 8 characters long</span>
                    </div>
                </div>
            </div>
            <div style={{ marginBottom: '5px' }}>
                <InputPasswordComponent
                    label="Confirm Password"
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                    validators={[
                        confirmPassword => (confirmPassword === password ? null : 'Passwords do not match')
                    ]}
                />
            </div>
        </>
    );
}

export default PasswordCreationComponent;
