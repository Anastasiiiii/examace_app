import './App.css';
import MainPage from './pages/MainPage';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/home" element={<HomePage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
