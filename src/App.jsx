import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer.jsx";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login/Login.jsx";
import PublicRoute from "./routes/PublicRoute";
import Register from "./pages/Register/Register.jsx";
import CreateProfile from "./pages/CreateProfile/CreateProfile.jsx";
import { CategoryProvider } from "./context/CategoryContext";
import CreateEvent from "./pages/CreateEvent/CreateEvent.jsx";
import PrivateRoute from "./routes/PrivateRoute";
import Profile from "./pages/Profile/Profile.jsx";
import EditProfile from "./pages/EditProfile/EditProfile.jsx";
import EventSearch from "./pages/EventSearch/EventSearch.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage.jsx";
import EventDashboard from "./pages/EventDashboard/EventDashboard.jsx";
import EventRegister from "./pages/EventRegister/EventRegister.jsx";
import MyEvents from "./pages/MyEvents/MyEvents.jsx";

function App() {
  return (
    <AuthProvider>
      <CategoryProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/create-profile"
              element={
                <PrivateRoute>
                  <CreateProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile/edit"
              element={
                <PrivateRoute>
                  <EditProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-event"
              element={
                <PrivateRoute>
                  <CreateEvent />
                </PrivateRoute>
              }
            />
            <Route
              path="/events"
              element={
                <PrivateRoute>
                  <EventSearch />
                </PrivateRoute>
              }
            />
            <Route
              path="/events/:eventId/dashboard"
              element={
                <PrivateRoute>
                  <EventRegister />
                </PrivateRoute>
              }
            />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            <Route
              path="/my-events/:eventId/dashboard"
              element={
                <PrivateRoute>
                  <EventDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-events"
              element={
                <PrivateRoute>
                  <MyEvents />
                </PrivateRoute>
              }
            />

            {/* <Route path="/my-events" element={<MyEvents />} />
        <Route path="/registered" element={<Registered />} />
        <Route path="/archived" element={<Archived />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/edit-profile" element={<EditProfile />} /> 
        <Route path="/community-rules" element={<CommunityRules />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/profile" element={<Profile />} />*/}
          </Routes>
          <Footer />
        </BrowserRouter>
      </CategoryProvider>
    </AuthProvider>
  );
}

export default App;
