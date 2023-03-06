import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Landing from "./Pages/Landing";
import Signup from "./Pages/Signup";
import Navbar from "./Components/Navbar";
import { States } from "./States";
import { useSelector } from "react-redux";
import { getUser } from "./Slice/userSlice";
import Player from "./Pages/Player";
import HarizontalNavbar from "./Components/HarizontalNavbar";
import Search from "./Pages/Search";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Api/firebase";
import EmailVerify from "./Pages/EmailVerify";
import { AuthProvider } from "./AuthContext";
import Profile from "./Pages/Profile";
import Plans from "./Pages/Plans";
import LikedSongs from "./Pages/LikedSongs";
import Payment from "./Pages/Payment";
import SongServices from "./services/SongServices";
import ViewAllSong from './admin/ViewAllSong'
import AddSong from './admin/AddSong'
import EditSong from './admin/EditSong'
function App() {
  const user = useSelector(getUser);
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);
  
  return (
    <div className="App">
      <Router>
        <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
          <States>
            {user == null || !user?.emailVerified ? (
              <>
                <Routes>
                  <Route path="/" element={<><Navbar /><Landing /></>}/>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/verify-email" element={!currentUser?.emailVerified && <EmailVerify />}/>
                </Routes>
              </>
            ) : (
              <>
                <Routes>
                  <Route path="/" element={<> <Navbar /> <Landing /> <Home /></>}/>
                  <Route path="/home/:id" element={<> <Navbar /><HarizontalNavbar /><Home /></>} />
                  <Route path="/search" element={<><Navbar /> <HarizontalNavbar /><Search /></>} />
                  <Route path="/profile" element={<><Navbar /><HarizontalNavbar /><Profile /></>} />
                  <Route path="/likedsongs" element={<><Navbar /><HarizontalNavbar /><LikedSongs /></>} />
                  <Route path="/premiumplans" element={<Plans />} />
                  <Route path="/payment" element={<Payment />} />
                </Routes>
              </>
            )}
                <Routes>
                  <Route path="/admin/allsongs" element={<ViewAllSong/>}/>
                  <Route path="/admin/addsong" element={<AddSong/>}/>
                  <Route path="/admin/editsong/:id" element={<EditSong/>}/>
                </Routes>
                <Player />
                {/* <Player /> */}
          </States>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
