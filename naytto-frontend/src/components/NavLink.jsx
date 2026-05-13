import { useState } from "react";
import { Link } from "react-router-dom";

const NavLink = ({ to, children, isMobile, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    padding: "5px 0",
    borderBottom: isHovered ? "2px solid #003cffb6" : "2px solid transparent",
    transition: "all 0.3s ease",
    fontSize: isMobile ? "14px" : "18px",
    zIndex: 2,
  };

  return (
    <Link
      to={to} // Linkin kohde
      style={linkStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default NavLink;
