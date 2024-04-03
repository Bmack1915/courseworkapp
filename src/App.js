import React from 'react';
import CustomMap from './components/map.tsx';
import Homepage from './components/Homepage.tsx';
import TeamPanel from './components/TeamPanel.tsx';


function App() {
  return (
    <div className="App">
      <Homepage></Homepage>
      <TeamPanel></TeamPanel>
      <CustomMap></CustomMap>
    </div>
  );
}

export default App;
