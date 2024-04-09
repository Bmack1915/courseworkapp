import React from 'react';
import CustomMap from './components/map.js';
import Homepage from './components/Homepage.js';
import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';
import TeamList from './components/TeamList.js';

function App() {
  return (
    <div className="App">
       <Navbar/>
       <Homepage></Homepage>
      <TeamList/>
      <Footer/>
      
    </div>
  );
}

export default App;
