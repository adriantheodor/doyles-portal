import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#eee" }}>
    <img src={logo} alt="Doyle's Logo" style={{ height: "40px", marginRight: "1rem" }} />
      <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
      <Link to="/about" style={{ marginRight: "1rem" }}>About</Link>
      <Link to="/contact" style={{ marginRight: "1rem" }}>Contact</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
};

export default Navbar;
