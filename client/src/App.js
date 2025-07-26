import React, {useState} from "react";
import {BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import AdminDashPage from './pages/AdminDashPage';
import CustomerDashPage from './pages/CustomerDashPage';
import RoleBasedRoute from './components/RoleBasedRoute';
import './App.css';

function AppWrapper() {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register', '/']; // pages that shouldn't show the nav
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);
  const [user, setUser] = useState(null);

  const handleLogin = (userInfo) => {
    setUser(userInfo);
    // Optionally redirect or update UI
  };

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage user={user} onLogin={handleLogin} />} />
        <Route path="/admin-dashboard" element={<RoleBasedRoute allowedRoles={['admin']}><AdminDashPage /></RoleBasedRoute>}/>
        <Route path="/customer-dashboard" element={<RoleBasedRoute allowedRoles={['customer']}> <CustomerDashPage /> </RoleBasedRoute>}/>
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
