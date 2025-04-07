import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/landing";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
