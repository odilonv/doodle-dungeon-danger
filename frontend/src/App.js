import React from 'react';
import './assets/css/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FooterComponent } from './components';
import {
  HomePage,
  LoginPage,
  NotFoundPage,
  SettingsPage,
  SignUpPage,
  UserPage,
  VerifyEmailPage
} from './pages';
import { NotificationProvider, UserProvider } from './contexts';

function App() {
  return (
    <Router>
      <UserProvider>
        <NotificationProvider>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/logout" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/verifyEmail/:token" element={<VerifyEmailPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </NotificationProvider>
        <FooterComponent />
      </UserProvider>
    </Router>
  );
}

export default App;
