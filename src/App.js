import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import { Navbar } from "./components/Navbar";
import BuildTeam from "./components/BuildTeamPage/BuildTeam";
import Footer from "./components/Footer";
import MapInfo from "./components/MapInfo";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Contact from "./components/Contact";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/BuildTeam" element={<BuildTeam />} />
              <Route path="/MapInfo" element={<MapInfo />} />
              <Route path="/Contact" element={<Contact />} />
            </Routes>
            <ToastContainer />
            <Footer />
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
