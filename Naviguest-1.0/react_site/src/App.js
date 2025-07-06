import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SelectionScreen from './ChoosePage';
import MapPage from './Map';
import ScrollToTop from './ScrollToTop'; 

function App() {
  return (
    <Router>
      <ScrollToTop /> 
      <Routes>     
        <Route path="/" element={<HomePage />} />
        <Route path="/choose" element={<SelectionScreen />} /> 
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </Router>
  );
}

export default App;
