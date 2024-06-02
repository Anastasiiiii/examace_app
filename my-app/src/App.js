import './App.css';
import MainPage from './pages/MainPage';
import HomePage from './pages/HomePage';
import TestPage from './pages/TestPage';
import ReadingPage from './pages/ReadingPage';
import CardsPage from './pages/CardsPage';
import AdminPage from './pages/AdminPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path='/test' element={<TestPage />} />
          <Route path='/reading' element={<ReadingPage />} />
          <Route path='/cards' element={<CardsPage />} />
          <Route path='/admin' element={<AdminPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
