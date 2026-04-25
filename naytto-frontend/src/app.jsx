import { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import BlogPage from "./components/BlogPage";
import QuestionnairePage from "./components/QuestionnairePage";
import NavLink from "./components/NavLink";
import LoginPage from "./components/LoginPage";

import { Routes, Route, useLocation } from "react-router-dom";

const App = () => {
  const [user /* setUser */] = useState(null);
  /* const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); */

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";
  });

  const headerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: isMobile ? "50px" : "80px",
    backgroundColor: "Black",
    display: "flex",
    alightItems: "center",
    justifyContent: "space-between",
    padding: isMobile ? "0 10px" : "0 40px",
    boxSizing: "border-box",
    zIndex: 10,
    transition: "all 0.3s ease",
  };

  const location = useLocation(); // Finds the location of the current page

  return (
    <div>
      <div style={headerStyle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "5px" : "20px",
          }}
        >
          <NavLink to="/" isMobile={isMobile}>
            Etusivu
          </NavLink>
          <NavLink to="/blogs" isMobile={isMobile}>
            Blogit
          </NavLink>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          {user ? ( // If the user has logged in, the page displays a log out button.
            <>
              <p
                style={{
                  color: "white",
                  margin: 0,
                  fontSize: isMobile ? "12px" : "16px",
                }}
              >
                {isMobile ? user.name : `Kirjautunut: ${user.name}`}
                <button
                  style={{ marginLeft: "10px" }} /* onClick={handleLogOut} */
                >
                  Kirjaudu ulos
                </button>
              </p>
            </>
          ) : (
            // If the user hasn't logged in, the page displays a log in button.
            location.pathname !== "/login" && (
              <NavLink to="/login" isMobile={isMobile}>
                Kirjaudu sisään
              </NavLink>
            )
          )}
        </div>
      </div>
      <div style={{ marginTop: isMobile ? "70px" : "90px" }}>
        <Routes>
          <Route
            path=""
            element={
              <>
                <HomePage />
              </>
            }
          />
          <Route
            path="/blogs"
            element={
              <>
                <BlogPage />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <LoginPage />
              </>
            }
            path="/questionnaire"
            element={
              <>
                <QuestionnairePage />
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
