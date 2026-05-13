import { useRef, useEffect, useState } from "react";

import NavLink from "./NavLink";

import { useLang } from "./LanguageContext";

const HomePage = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        console.log(
          "Autoplay was prevented. User interaction may be required.",
        );
      });
    }
  }, []);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sectionStyleBase = (bgColor) => ({
    minHeight: "100vh", // Use minHeight so it can grow if text is long
    width: "100%",
    backgroundColor: bgColor,
    display: "flex",
    flexDirection: "column", // Column is safer for all slides
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    padding: isMobile ? "80px 20px" : "40px 0", // Space for header & breathing room
    boxSizing: "border-box",
    overflow: "hidden",
  });

  const mediaContainer1 = {
    position: isMobile ? "absolute" : "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    top: isMobile ? "30px" : "45px",
    right: isMobile ? "0px" : "15px",
    justifyContent: isMobile ? "center" : "end",
  };

  const textContainerStyle = {
    width: "100%",
    maxWidth: "800px",
    textAlign: "center",
    color: "#ffffff",
  };

  const h1Style = {
    fontSize: isMobile ? "24px" : "40px",
    marginBottom: "20px",
  };

  const h2Style = {
    fontSize: isMobile ? "16px" : "24px",
    fontWeight: "normal",
    lineHeight: "1.6",
    margin: "15px 0",
    color: "white",
  };

  const imageStyle = {
    width: "100%", // Takes up 100% of the mediaContainer
    height: "100%",
    objectFit: "contain",
    zIndex: 2,
  };

  const videoStyle = {
    position: "absolute", // Sits behind the image
    top: 0,
    left: 0,
    width: "100%", // Fills the mediaContainer
    height: "100%", // Adjusted to be smaller than the image like your original
    objectFit: "cover",
    zIndex: 1,
    opacity: 1,
  };

  const { t } = useLang();

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#000000",
        userSelect: "none",
        WebkitUserSelect: "none",
        msUserSelect: "none",
      }}
    >
      {/* SLIDE 1 */}
      <section style={sectionStyleBase("#5e5e5e")}>
        {
          <video
            ref={videoRef}
            src="../dist/videos/Nettipätkä.mp4"
            style={{ ...videoStyle, pointerEvents: "none" }}
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            onContextMenu={(e) => e.preventDefault()}
          />
        }
        <div style={{ ...mediaContainer1, zIndex: 2 }}>
          <img
            src="../dist/images/funnyfishinginfinland_primarylogo.png"
            style={{
              height: isMobile ? "240px" : "250px",
              width: "auto",
              opacity: "0.9",
            }}
            alt="Slide 1"
          />
        </div>
      </section>

      {/* SLIDE 2 */}
      <section style={sectionStyleBase("#000000")}>
        <div style={textContainerStyle}>
          <h1 style={h1Style}>{t("homeContents.slideTitle1")}</h1>
          <h2 style={h2Style}>{t("homeContents.slideContents1")}</h2>
          <img
            src="../dist/images/vene.jpg"
            style={{ ...imageStyle, maxHeight: "50vh" }}
            alt="Vene"
          />
          <h2 style={h2Style}>{t("homeContents.slideContents2")}</h2>
        </div>
      </section>

      {/* SLIDE 3 */}
      <section style={sectionStyleBase("#0a0a0a")}>
        <div
          style={{
            ...textContainerStyle,
            textAlign: isMobile ? "center" : "left",
          }}
        >
          <h2 style={{ ...h2Style, fontSize: isMobile ? "14px" : "24px" }}>
            {t("homeContents.slideTitle2")}
            <br />
            <br />
            {t("homeContents.slideContents3")}
            <br />
            <br />
            {t("homeContents.slideContents4")}
            <br />
            <br />
            {t("homeContents.slideContents5")}
          </h2>
        </div>
      </section>

      {/* SLIDE 4 */}
      <section style={sectionStyleBase("#000000")}>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "40px" : "80px",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                height: isMobile ? "auto" : "250px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <img
                src="../dist/images/rockandlake.png"
                style={{ ...imageStyle, maxHeight: "200px" }}
                alt="RockAndLake"
              />
            </div>
            <h2 style={h2Style}>
              Rock and lake
              <br />
              <br />
              {t("homeContents.slideContents6")}
            </h2>
            <NavLink to="https://www.rockandlake.com" isMobile={isMobile}>
              <strong>Rock And Lake</strong>
            </NavLink>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                height: isMobile ? "auto" : "250px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <img
                src="../dist/images/amrfishing.png"
                style={{ ...imageStyle, maxHeight: "200px" }}
                alt="AmrFishing"
              />
            </div>
            <h2 style={h2Style}>
              AMR-Fishing
              <br />
              <br />
              {t("homeContents.slideContents7")}
              <br />
              {t("homeContents.slideContents8")}
            </h2>
            <NavLink to="https://www.amrfishing.com" isMobile={isMobile}>
              <strong>AMR-Fishing</strong>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
