import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import Login from "./pages/Login/Login";
import NavBar from "./components/Nav/Nav";
import Home from "./pages/Home/Home";
import Create from "./pages/Create/Create";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false");
  };

  return (
    <Provider store={store}>
      <Router>
        {isAuthenticated ? (
          <div>
            <NavBar onLogout={handleLogout} />{" "}
            <Routes>
              <Route path="/home" element={<Home onLogout={handleLogout} />} />
              <Route path="/create" element={<Create />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </div>
        ) : (
          <Routes>
            <Route path="*" element={<Login login={handleLogin} />} />
          </Routes>
        )}
      </Router>
    </Provider>
  );
}

export default App;
