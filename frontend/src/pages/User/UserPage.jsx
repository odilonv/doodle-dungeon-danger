import React, { useState, useContext } from 'react';
import { ModalComponent, UserInfoComponent, UserInfoEntryComponent } from '../../components';
import { logout } from '../../services/API/ApiUser';
import UserInfoCategoryComponent from "../../components/User/UserInfoCategoryComponent";
import { Divider } from "@mui/material";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import IdentityIcon from '@mui/icons-material/PersonRounded';
import ContactIcon from '@mui/icons-material/CallRounded';
import { UserContext } from "../../contexts/UserContext";

function UserPage() {
    const { user, setUser } = useContext(UserContext);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            window.location.href = '/';
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const handleDeleteAccount = () => {
        console.log("delete account");
        setIsModalVisible(true);
    };

    return (
        <form>
            <div className={"user-categories-container"}>
                <div className="user-categories default-container" id="user-categories">
                    <UserInfoCategoryComponent entryLabel="Identity" icon={<IdentityIcon />} />
                    <Divider />
                    <UserInfoCategoryComponent entryLabel="Contact" icon={<ContactIcon />} />
                </div>
                <div className="manage-account-container">
                    <div className="manage-account-button" onClick={handleLogout}>
                        Log out <LogoutRoundedIcon />
                    </div>
                    <div className="manage-account-button delete-account" onClick={handleDeleteAccount}>
                        Delete my account <HighlightOffRoundedIcon />
                    </div>
                </div>
            </div>
            <div className="user-info-container">
                {user ? (
                    <>
                        <UserInfoComponent
                            key="identity"
                            headerText="Identity"
                            value={[
                                <UserInfoEntryComponent
                                    key="firstName"
                                    entryLabel="First Name"
                                    entryValue={user.firstName}
                                />,
                                <UserInfoEntryComponent
                                    key="lastName"
                                    entryLabel="Last Name"
                                    entryValue={user.lastName}
                                />,
                            ]}
                        />
                        <UserInfoComponent
                            key="contact"
                            headerText="Contact"
                            value={[
                                <UserInfoEntryComponent
                                    key="email"
                                    entryLabel="Email"
                                    entryValue={user.email}
                                />,
                            ]}
                        />
                    </>
                ) : null}
            </div>
            <ModalComponent open={isModalVisible} handleClose={() => setIsModalVisible(false)} />
        </form>
    );
}

export default UserPage;
