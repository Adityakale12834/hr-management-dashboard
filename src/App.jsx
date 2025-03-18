import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Layout from "./Layout";
import Home from "./Components/Home";
import Signup from "./Components/auth/Signup";

function App() {
  const location = useLocation();

  // Pages where the navbar should NOT be displayed
  const hideNavbar = location.pathname === "/signup";

  return (
    <>
      <div>
        {!hideNavbar && <Navbar />}
        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
