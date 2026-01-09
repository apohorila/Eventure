import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Header from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/my-events" element={<MyEvents />} />
        <Route path="/registered" element={<Registered />} />
        <Route path="/archived" element={<Archived />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/edit-profile" element={<EditProfile />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
