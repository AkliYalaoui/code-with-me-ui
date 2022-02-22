import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home, Login, Register, Dashboard } from "./pages";
import { Navbar } from "./compoents";
import { useAuth } from "./context/AuthProvider";

const App = () => {
  const [user] = useAuth();
  return (
    <Router>
      <Navbar />
      <div className="max-w-7xl m-auto p-4 my-10">
        <Routes>
          <Route path="/" element={<Home />} />
          {user ? (<Route path="/dashboard" element={<Dashboard />} />) : (<Route path="/dashboard" element={<Navigate to="/login" />} />)}
          {!user ? (<Route path="/login" element={<Login />} />) : (<Route path="/login" element={<Navigate to="/dashboard" />} />)}
          {!user ? (<Route path="/register" element={<Register />} />) : (<Route path="/register" element={<Navigate to="/dashboard" />} />)}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
