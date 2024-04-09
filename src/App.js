import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import { Navbar } from "./components/Navbar";
import TeamList from "./components/TeamList";
import Footer from "./components/Footer";
import MapInfo from "./components/MapInfo";
import StadiumMap from "./components/StadiumMap";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/TeamList" element={<TeamList />} />
          <Route path="/MapInfo" element={<MapInfo />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
