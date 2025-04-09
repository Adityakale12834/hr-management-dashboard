import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Layout from "./Layout";
import Home from "./Components/Home";
import Signup from "./Components/auth/Signup";
import { Toaster } from "react-hot-toast";
import LandingPage from "./Components/LandingPage/page";
function App() {
  const location = useLocation();

  // Pages where the navbar should NOT be displayed
  const hideNavbar =
    location.pathname === "/signup" || location.pathname === "/";

  return (
    <>
      <div>
        {!hideNavbar && <Navbar />}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}

export default App;
