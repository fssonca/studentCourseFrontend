import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/common/NavBar";
import HomePage from "./pages/HomePage";
import StudentsPage from "./pages/StudentsPage";
import CoursesPage from "./pages/CoursesPage";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/students/*" element={<StudentsPage />} />
          <Route path="/courses/*" element={<CoursesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
