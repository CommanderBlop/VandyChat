// App.js
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ConfirmationPage from "./pages/ConfirmationPage/ConfirmationPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import RegistrationPage1 from "./pages/RegistrationPage/RegistrationPage1";
import RegistrationPage2 from "./pages/RegistrationPage/RegistrationPage2";
import RegistrationPage3 from "./pages/RegistrationPage/RegistrationPage3";
import FeedbackPage from "./pages/FeedbackPage/FeedbackPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reg" element={<RegistrationPage1 />} />
        <Route path="/reg2" element={<RegistrationPage2 />} />
        <Route path="/reg3" element={<RegistrationPage3 />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </Router>
  );
}

export default App;
