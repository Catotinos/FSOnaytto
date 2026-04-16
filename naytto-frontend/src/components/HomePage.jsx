import { useRef, useEffect } from "react";

const imageStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "75%",
  zindex: "1",
};

const videoStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%",
  width: "100%",
  height: "80%",
  zindex: "0",
};

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

  return (
    <div>
      <video
        ref={videoRef}
        src="../dist/videos/tung.mp4"
        style={videoStyle}
        autoPlay
        muted
        loop
        playsInline
      ></video>
      <img
        src="../dist/images/funnyfishinginfinland_primarylogo.png"
        style={imageStyle}
      ></img>
    </div>
  );
};

export default HomePage;
