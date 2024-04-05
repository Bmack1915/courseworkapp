import React from 'react';
import CustomMap from './components/map.js';
import Homepage from './components/Homepage.js';
import TeamPanel from './components/TeamPanel.js';
import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';
import Teampage from './components/Teampage.js';

function App() {
  return (
    <div className="App">
       <Navbar/>
      <Teampage/>
      <Footer/>
      
    </div>
  );
}

export default App;
