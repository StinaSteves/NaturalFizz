/* - - - - - Generall - - - - - */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/* - - - - - Pages / Components - - - - - */
import Navigation from './components/Navigation';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

/* - - - - - Styles - - - - - */
import './App.css';

/* - - - - - - - - - - Code - - - - - - - - - - */
function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

