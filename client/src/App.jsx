import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

// Pages
import DailyCommander from "./pages/DailyCommander";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NavBar from "./components/NavBar";

function App() {
  const { user } = useContext(UserContext);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="App-content">
          <NavBar />
          <div className="App-content"></div>
          <Routes>
            <Route path="/" element={user ? <DailyCommander /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
