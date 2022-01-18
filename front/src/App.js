import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppContext } from "./Context/AppContext";
import { getBasicUserInfo } from "./lib/UsersDB";
import { ChakraProvider } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBarArcade from "./components/NavBarArcade";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import Snake from "./games/Snake/Snake";
import Minesweeper from "./games/Minesweeper/Minesweeper";

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const localToken = localStorage.getItem("TOKEN");
    if (localToken) {
      setToken(localToken);
      getBasicUserInfo(localToken).then((response) => {
        console.log(response.data);
        if (!response) {
          localStorage.clear();
        } else {
          setCurrentUser(response.data);
          setIsAdmin(response.data.isAdmin);
        }
      });
    }
  }, [showModal]);

  return (
    <AppContext.Provider
      value={{
        currentUser: currentUser,
        setCurrentUser: setCurrentUser,
        showModal: showModal,
        setShowModal: setShowModal,
        isAdmin: isAdmin,
        setIsAdmin: setIsAdmin,
        token: token,
        setToken: setToken,
      }}
    >
      <ChakraProvider>
        <BrowserRouter>
          <div className="App">
            <NavBarArcade />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Snake" element={<Snake />} />
              <Route path="/Minesweeper" element={<Minesweeper />} />
              <Route path="/myProfile" element={<ProfilePage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ChakraProvider>
    </AppContext.Provider>
  );
}

export default App;
