import { useRef, useEffect, useState } from "react";

import NavLink from "./NavLink";

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

  const mediaContainer1 = {
    position: "relative",
    width: "50%",
    height: "75%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const mediaContainer = {
    position: "relative",
    width: "50%",
    height: "75%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const imageStyle = {
    width: "75%", // Takes up 100% of the mediaContainer
    height: "75%",
    objectFit: "contain",
    zIndex: 2,
  };

  /* const videoStyle = {
    position: "absolute", // Sits behind the image
    width: "100%", // Fills the mediaContainer
    height: "100%", // Adjusted to be smaller than the image like your original
    objectFit: "cover",
    zIndex: 1,
  }; */

  return (
    <div style={{ width: "100%" }}>
      {/* SLIDE 1 */}
      <section style={sectionStyle("black")}>
        <div style={mediaContainer1}>
          {/* <video
            ref={videoRef}
            src="../dist/videos/tung.mp4"
            style={videoStyle}
            autoPlay
            muted
            loop
            playsInline
          /> */}
          <img
            src="../dist/images/funnyfishinginfinland_primarylogo.png"
            style={imageStyle}
            alt="Slide 1"
          />
          <NavLink to="/feedback" isMobile={isMobile}>
            Asiakaspalaute
          </NavLink>
        </div>
      </section>

      {/* SLIDE 2 */}
      <section style={sectionStyle("#1a1a1a")}>
        <div style={mediaContainer}></div>
      </section>

      {/* SLIDE 3 */}
      <section style={sectionStyle("#001f3f")}>
        <div style={mediaContainer}></div>
      </section>
    </div>
  );
};

export default HomePage;
