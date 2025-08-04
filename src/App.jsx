import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ShoppingListPage from "./pages/ShoppinListPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/signup">Signup</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ShoppingListPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
