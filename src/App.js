import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import { Navbar } from "./components/Navbar";
import TeamList from "./components/BuildTeamPage/TeamList";
import Footer from "./components/Footer";
import MapInfo from "./components/MapInfo";
import { store } from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
