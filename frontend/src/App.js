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
  VerifyEmailPage,
  DungeonPage,
  DungeonsPage,
  HeroSkinPage,
  VictoryPage,
  DefeatPage
} from './pages';
import { HeroProvider, NotificationProvider, UserProvider } from './contexts';

function App() {
  return (
    <Router>
      <UserProvider>
        <NotificationProvider>
          <HeroProvider>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/dungeons" element={<DungeonsPage />} />
              <Route path="/dungeon" element={<DungeonPage />} />
              <Route path="/choose-your-hero" element={<HeroSkinPage />} />
              <Route path="/logout" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/verifyEmail/:token" element={<VerifyEmailPage />} />
              <Route path="/signUp" element={<SignUpPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/victory" element={<VictoryPage />} />
              <Route path="/defeat" element={<DefeatPage />} />
            </Routes>
          </HeroProvider>
        </NotificationProvider>
        <FooterComponent />
      </UserProvider>
    </Router>
  );
}

export default App;
