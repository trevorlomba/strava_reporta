import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MileageReport from './components/MileageReport';
import ReportSlider from './components/ReportSlider';
import Footer from './components/Footer';
import './styles/App.scss';

function App() {
  return (
    <div className="App">
      <div className="center">
        <h1>Progress Report for TJ</h1>
        <Router>
          <MileageReport />
        <ReportSlider />
        </Router>
        <Footer />
      </div>
    </div>
  );
}

export default App;