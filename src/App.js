import React, { Component }  from 'react';
import { useState } from "react";
import logo from './logo.svg';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SavedSong from "./pages/SavedSong";
import Login from "./pages/Login";
import Register from "./pages/Register";
import './App.css';

function App() {
  const [auth, setAuth] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/register" element={<Register setAuth={setAuth} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/saved-song" element={<SavedSong />} />
        <Route path="/" element={
            auth ? (
              <Home setAuth={setAuth} />
            ) : (
              <Navigate to="/login" replace />
            )
          }>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;