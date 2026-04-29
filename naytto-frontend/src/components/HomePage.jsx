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

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sectionStyle = (bgColor) => ({
    height: "100vh",
    width: "100%",
    backgroundColor: bgColor,
    display: "flex", // Flex handles centering perfectly
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    margin: 0,
    padding: 0,
  });

  const sectionStyle2 = (bgColor) => ({
    height: "100vh",
    width: "100%",
    backgroundColor: bgColor,
    display: "flex", // Flex handles centering perfectly
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    margin: 0,
    padding: 0,
  });

  const rowContainer = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "40px",
    width: "100%",
  };

  const itemGroup = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: isMobile ? "80%" : "40%",
  };

  const mediaContainer1 = {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const textContainerStyle = {
    maxWidth: "800px",
    textAlign: "center",
    padding: "0 20px",
    color: "#ffffff",
  };

  const textContainerStyle2 = {
    maxWidth: "800px",
    textAlign: "left",
    padding: "0 20px",
  };

  const h1Style = {
    fontSize: isMobile ? "24px" : "36px",
    marginBottom: "20px",
  };

  const h2Style = {
    fontSize: isMobile ? "16px" : "20px",
    fontWeight: "normal",
    lineHeight: "1.6",
    margin: "15px 0",
    color: "white",
  };

  const imageStyle = {
    width: "75%", // Takes up 100% of the mediaContainer
    height: "75%",
    objectFit: "contain",
    zIndex: 2,
  };

  const videoStyle = {
    position: "absolute", // Sits behind the image
    width: "100%", // Fills the mediaContainer
    height: "100%", // Adjusted to be smaller than the image like your original
    objectFit: "cover",
    zIndex: 1,
  };

  const { t } = useLang();

  return (
    <div style={{ width: "100%" }}>
      {/* SLIDE 1 */}
      <section style={sectionStyle("#969795")}>
        <div style={mediaContainer1}>
          {
            <video
              ref={videoRef}
              src="../dist/videos/Nettipätkä.mp4"
              style={videoStyle}
              autoPlay
              muted
              loop
              playsInline
            />
          }
          <img
            src="../dist/images/funnyfishinginfinland_primarylogo.png"
            style={imageStyle}
            alt="Slide 1"
          />
          <NavLink to="/questionnaire" isMobile={isMobile}>
            {t("formTitle")}
          </NavLink>
        </div>
      </section>

      {/* SLIDE 2 */}
      <section style={sectionStyle2("#000000")}>
        <div style={textContainerStyle}>
          <h1 style={h1Style}>{t("homeContents.slideTitle1")}</h1>
          <h2 style={h2Style}>{t("homeContents.slideContents1")}</h2>
          <img
            src="../dist/images/vene.jpg"
            style={{ ...imageStyle, height: "auto", maxHeight: "30vh" }}
            alt="Vene"
          />
          <h2 style={h2Style}>{t("homeContents.slideContents2")}</h2>
        </div>
      </section>

      {/* SLIDE 3 */}
      <section style={sectionStyle("#0f0f0f")}>
        <div style={textContainerStyle2}>
          <h2 style={h2Style}>
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
      <section style={sectionStyle("#000000")}>
        <div style={rowContainer}>
          <div style={itemGroup}>
            <img
              src="../dist/images/rockandlake.png"
              style={{
                ...imageStyle,
                width: "100%",
                height: "auto",
                maxHeight: "25vh",
              }}
              alt="RockAndLake"
            />
            <h2 style={h2Style}>
              Rock and lake
              <br />
              <br />
              {t("homeContents.slideContents6")}
            </h2>
            <NavLink to="https://www.rockandlake.com" isMobile={isMobile}>
              Rock And Lake
            </NavLink>
          </div>
          <div style={itemGroup}>
            <img
              src="../dist/images/amrfishing.png"
              style={{
                ...imageStyle,
                width: "100%",
                height: "auto",
                maxHeight: "25vh",
              }}
              alt="AmrFishing"
            />
            <h2 style={h2Style}>
              AMR-Fishing
              <br />
              <br />
              {t("homeContents.slideContents7")}
              <br />
              {t("homeContents.slideContents8")}
            </h2>
            <NavLink to="https://www.amrfishing.com" isMobile={isMobile}>
              AMR-Fishing
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
