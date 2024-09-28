import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import MapView from './components/MapView';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MapView />} />
      </Routes>
    </Router>
  );
}

export default App
