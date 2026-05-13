import { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import BlogPage from "./components/BlogPage";
import QuestionnairePage from "./components/QuestionnairePage";
import NavLink from "./components/NavLink";
import LoginPage from "./components/LoginPage";
import { useLang } from "./components/LanguageContext";

import { Routes, Route, useLocation } from "react-router-dom";

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);

    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";
    document.body.style.backgroundColor = "black";

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const headerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: isMobile ? "auto" : "80px",
    minHeight: isMobile ? "60px" : "80px",
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: isMobile ? "0 10px" : "0 40px",
    boxSizing: "border-box",
    zIndex: 1000,
    transition: "all 0.3s ease",
  };

  const location = useLocation(); // Finds the location of the current page */

  const { lang, switchLanguage, t } = useLang();

  const contentPaddingTop =
    location.pathname === "/" ? "0px" : isMobile ? "60px" : "80px";

  return (
    <div
      style={{
        width: "100%",
        userSelect: "none",
        WebkitUserSelect: "none",
        msUserSelect: "none",
      }}
    >
      <div style={headerStyle}>
        {isMobile ? (
          <>
            <button
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "2rem",
                cursor: "pointer",
                zIndex: 2001,
              }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open menu"
            >
              ☰
            </button>
            {menuOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "60px",
                  left: 0,
                  width: "100vw",
                  background: "#111",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  zIndex: 2000,
                  padding: "10px 0",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }}
              >
                <NavLink
                  to="/"
                  isMobile={isMobile}
                  onClick={() => setMenuOpen(false)}
                >
                  {t("navHome")}
                </NavLink>
                <NavLink
                  to="/blogs"
                  isMobile={isMobile}
                  onClick={() => setMenuOpen(false)}
                >
                  {t("navBlogs")}
                </NavLink>
                <NavLink
                  to="/questionnaire"
                  isMobile={isMobile}
                  onClick={() => setMenuOpen(false)}
                >
                  {t("formTitle")}
                </NavLink>
                <NavLink
                  to="/login"
                  isMobile={isMobile}
                  onClick={() => setMenuOpen(false)}
                >
                  {t("navLogin")}
                </NavLink>
              </div>
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginLeft: "auto",
              }}
            >
              <img
                src="../dist/images/funnyfishinginfinland_logo_white.png"
                style={{
                  height: "60px", // Scale up appropriately for mobile layouts
                }}
              />
              <NavLink
                to="https://www.tiktok.com/@funnyfishinginfinland"
                isMobile={isMobile}
              >
                TikTok
              </NavLink>
              <NavLink
                to="https://www.instagram.com/funnyfishinginfinland"
                isMobile={isMobile}
              >
                Instagram
              </NavLink>
              <button
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  border: "1px solid white",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  cursor: "pointer",
                  fontSize: "12px",
                  marginLeft: "5px",
                }}
                onClick={() => switchLanguage(lang === "fi" ? "en" : "fi")}
              >
                {lang === "fi" ? "EN" : "FI"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <NavLink to="/" isMobile={isMobile}>
                {t("navHome")}
              </NavLink>
              <NavLink to="/blogs" isMobile={isMobile}>
                {t("navBlogs")}
              </NavLink>
              <NavLink to="/questionnaire" isMobile={isMobile}>
                {t("formTitle")}
              </NavLink>
              <NavLink to="/login" isMobile={isMobile}>
                {t("navLogin")}
              </NavLink>
            </div>
            <div
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src="../dist/images/funnyfishinginfinland_logo_white.png"
                style={{
                  height: "90px",
                  zIndex: 1001,
                }}
              ></img>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <NavLink
                to="https://www.tiktok.com/@funnyfishinginfinland"
                isMobile={isMobile}
              >
                TikTok
              </NavLink>
              <NavLink
                to="https://www.instagram.com/funnyfishinginfinland"
                isMobile={isMobile}
              >
                Instagram
              </NavLink>
              <button
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  border: "1px solid white",
                  borderRadius: "4px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  fontSize: "12px",
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
                onClick={() => switchLanguage(lang === "fi" ? "en" : "fi")}
              >
                {lang === "fi" ? "EN" : "FI"}
              </button>
            </div>
          </>
        )}
      </div>

      <div style={{ width: "100%", paddingTop: contentPaddingTop }}>
        <Routes>
          <Route
            path=""
            element={
              <>
                <HomePage isMobile={isMobile} />
              </>
            }
          />
          <Route
            path="/blogs"
            element={
              <>
                <BlogPage isMobile={isMobile} />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <LoginPage isMobile={isMobile} />
              </>
            }
          />
          <Route
            path="/questionnaire"
            element={
              <>
                <QuestionnairePage isMobile={isMobile} />
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
