import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ShoppingListPage from "./pages/ShoppinListPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/signup">Signup</Link> |
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ShoppingListPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
