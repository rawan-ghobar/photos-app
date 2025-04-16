import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/landing";
import Crop from "./pages/crop/crop";
import Rotate from "./pages/rotate/rotate";
import Effect from "./pages/effect/effect";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import ChatBox from "./pages/chatbox/chatbox";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/crop" element={<Crop />} />
        <Route path="/rotate" element={<Rotate />} />
        <Route path="/effect" element={<Effect />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatBox />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
