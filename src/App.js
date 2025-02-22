import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./header"; // Import the Header component
import HomeLanding from "./homeLanding"; // Import your HomeLanding component
import SignInPage from "./signInPage"; // Import your SignInPage component

export default function App() {
  return (
    <Router> {/* Wrap everything in Router */}
      <Header /> {/* Header will have access to Router */}
      <Routes>
        <Route path="/" element={<HomeLanding />} /> {/* HomeLanding route */}
        <Route path="/signin" element={<SignInPage />} /> {/* SignInPage route */}
        <Route path="/realtors-contractors" element={<div>Realtors/Contractors Page</div>} />
      </Routes>
    </Router>
  );
}
