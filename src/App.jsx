import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home.jsx"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}>
      </Route>
    </Routes>
  );
}

export default App;
