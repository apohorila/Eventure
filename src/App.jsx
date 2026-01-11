import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer.jsx";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/my-events" element={<MyEvents />} />
        <Route path="/registered" element={<Registered />} />
        <Route path="/archived" element={<Archived />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/edit-profile" element={<EditProfile />} /> 
        <Route path="/community-rules" element={<CommunityRules />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/profile" element={<Profile />} />*/}
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
