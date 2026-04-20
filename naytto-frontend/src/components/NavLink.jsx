import { useState } from "react";
import { Link } from "react-router-dom";

const NavLink = ({ to, children, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false);

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    padding: "5px 0",
    borderBottom: isHovered ? "2px solid #00d4ff" : "2px solid transparent",
    transition: "border-bottom 0.3s ease",
    fontSize: isMobile ? "14px" : "18px",
  };

  return (
    <Link
      to={to} // Linkin kohde
      style={linkStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  );
};

export default NavLink;
