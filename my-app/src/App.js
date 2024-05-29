import './App.css';
import MainPage from './pages/MainPage';
import HomePage from './pages/HomePage';
import TestPage from './pages/TestPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path='/test' element={<TestPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
