import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import { Navbar } from "./components/Navbar";
import TeamList from "./components/TeamList";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/TeamList" element={<TeamList />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
