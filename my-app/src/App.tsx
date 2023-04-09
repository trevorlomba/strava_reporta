import React from 'react';
import MileageReport from './components/MileageReport';
import CadenceReport from './components/CadenceReport';
import Footer from './components/Footer';   
import './styles/App.scss'

function App() {
  return (
    <div className="App">
      <div className='center'>
      <h1>Progress Update for TJ</h1>
      <MileageReport />
      <CadenceReport />
      <Footer />
      </div>
    </div>
  );
}

export default App;