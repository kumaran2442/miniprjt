// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Calculation from './Components/Calculation';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<About/>} />
        <Route path="/calculation" element={<Calculation />} />
        
      </Routes>
    </Router>
  );
};

export default App;
