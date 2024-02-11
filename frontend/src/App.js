import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import JoinRoom from "./components/JoinRoom";
import CreateRoom from "./components/CreateRoom";
import ProblemStatement from "./pages/ProblemStatement";
import Signout from "./components/authentication/Signout";
import login from "./components/authentication/Login";
import NavBar from "./components/navbar";
import Editor from "./components/editor";
import { Room } from "./components/Room";
import Admin from "./components/Admin";
import AddProblem from "./components/addProblem";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import Repositories from "./components/Repositories";
import Leaderboard from "./components/authentication/LeaderBoard";
import Achievements from "./components/Achievements";
import Resume from "./components/Resume";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Homepage />} />
        <Route path="signout" element={<Signout />} />
        <Route path="/joinroom" element={<JoinRoom />} />
        <Route path="/createroom" element={<CreateRoom />} />
        <Route path="/problems" element={<ProblemStatement />} />
        <Route path="/room/:userId" element={<Room />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/addProblem" element={<AddProblem />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/repositories" element={<Repositories />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </div>
  );
}

export default App;
