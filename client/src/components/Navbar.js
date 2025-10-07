import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Navbar = ({ user, setUser, activeSection, setActiveSection }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  return (
    <nav style={{ padding: "1rem", backgroundColor: "#eee", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <img src={logo} alt="Doyle's Logo" style={{ height: "40px", marginRight: "1rem" }} />

        {!user && (
          <>
            <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
            <Link to="/about" style={{ marginRight: "1rem" }}>About</Link>
            <Link to="/contact" style={{ marginRight: "1rem" }}>Contact</Link>
            <Link to="/quote" style={{ marginRight: "1rem" }}>Get a Quote</Link>
            <Link to="/login" style={{ marginRight: "1rem" }}>Login</Link>
            <Link to="/register" style={{ marginRight: "1rem" }}>Register</Link>
          </>
        )}

        {user?.role === 'admin' && (
          <>
            <button onClick={() => {navigate('/admin-dashboard');
              setActiveSection && setActiveSection('overview');}} style={{ marginRight: "1rem" }}>Admin Home</button>
            <button onClick={() => setActiveSection('inventory')} style={{ marginRight: "1rem" }}>Inventory</button>
            <button onClick={() => setActiveSection('orders')} style={{ marginRight: "1rem" }}>Orders</button>
            <button onClick={() => setActiveSection('maintenance')} style={{ marginRight: "1rem" }}>Maintenance</button>
            <button onClick={() => setActiveSection('invoices')} style={{ marginRight: "1rem" }}>Invoices</button>
            <button onClick={() => setActiveSection('qrcodes')} style={{ marginRight: "1rem" }}>QR Codes</button>
          </>
        )}

        {user?.role === 'customer' && (
          <>
            <button onClick={() => navigate('/customer-dashboard')} style={{marginRight: "1rem"}}>Customer Home</button>
          </>
        )}
      </div>

      {user && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: "1rem" }}>Welcome, {user.name}</span>
          <button onClick={handleChangePassword} style={{ marginRight: "0.5rem" }}>Change Password</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;