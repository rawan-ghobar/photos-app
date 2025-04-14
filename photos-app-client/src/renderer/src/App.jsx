import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/landing";
import Crop from "./pages/crop/crop";
import Rotate from "./pages/rotate/rotate";
import Effect from "./pages/effect/effect";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/crop" element={<Crop />} />
      <Route path="/rotate" element={<Rotate />} />
      <Route path="/effect" element={<Effect />} />
      </Routes>
    </Router>
  );
}

export default App;
