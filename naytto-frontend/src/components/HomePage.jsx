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

  return (
    <div style={{ width: "100%" }}>
      {/* SLIDE 1 */}
      <section style={sectionStyle("#969795")}>
        <div style={mediaContainer1}>
          { <video
            ref={videoRef}
            src="../dist/videos/Nettipätkä.mp4"
            style={videoStyle}
            autoPlay
            muted
            loop
            playsInline
          /> }
          <img
            src="../dist/images/funnyfishinginfinland_primarylogo.png"
            style={imageStyle}
            alt="Slide 1"
          />
          <NavLink to="/questionnaire" isMobile={isMobile}>
            Kyselylomake
          </NavLink>
        </div>
      </section>

      {/* SLIDE 2 */}
      <section style={sectionStyle2("#000000")}>
        <div style={textContainerStyle}>
          <h1 style={h1Style}>FUNNY FISHING IN FINLAND YRITYSESITTELY</h1>
          <h2 style={h2Style}>
            Funny Fishing in Finland on 2023 perustettu yritys, jonka päätoimi
            on järjestää kalastusmatkoja Etelä-Savossa, tarvittaessa teemme
            muuallakin tai yhteistyökumppanien kanssa retkiä.
          </h2>
          <img
            src="../dist/images/vene.jpg"
            style={{ ...imageStyle, height: "auto", maxHeight: "30vh" }}
            alt="Vene"
          />
          <h2 style={h2Style}>
            Vene on Finval 555 FishPro, 200 hv perämoottorilla, Lowrances
            luotaimilla ja Active target live antureilla varustettu.
          </h2>
        </div>
      </section>

      {/* SLIDE 3 */}
      <section style={sectionStyle("#0f0f0f")}>
        <div style={textContainerStyle2}>
          <h2 style={h2Style}>
            Kalastusopas Tero Hasa
            <br />
            <br />
            Hei! Olen Tero, kalastusoppaasi, ja olen kalastanut Järvi-Suomen
            vesillä jo vuosien ajan. Hallitsen monenlaiset kalastustekniikat,
            mutta todellinen intohimoni on suurten kalojen pyytäminen
            nykyaikaisella live-kaikuluotaimella. Olen jatkuvasti kiinnostunut
            oppimaan lisää kalojen käyttäytymisestä - erityisesti siitä, miten
            tuuli, lämpötila ja valo vaikuttavat niiden liikkeisiin ja siitä,
            mitkä värit ja tekniikat toimivat parhaiten eri olosuhteissa.
            <br />
            <br />
            Kestävä kalastus on minulle tärkeää. Kaikki ylimittaiset kalat
            vapautetaan takaisin järveen, jotta kalakannat säilyvät
            elinvoimaisina. Osallistun säännöllisesti kalastuskilpailuihin, mikä
            pitää taitoni terävinä. Vietän vesillä vuosittain 50-70 päivää, ja
            nautin siitä, että voin jakaa tämän kokemuksen asiakkaideni kanssa.
            <br />
            <br />
            Kalastusretkillämme käytämme Finval 555 Fish Pro -venettä, jossa on
            200 hevosvoiman moottori - turvallinen ja nopea liikkuminen taattu.
            Vene on varustettu uusimmalla Lowrance LIVE -kaikuluotaimella ja
            Motor Guide -sähkömoottorilla, joiden avulla kalastushetkestä
            saadaan kaikki irti.
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
              Rock and lake kalastusmatkailijalle kaikki majoitus,
              kalastusveneet, opastukset ja aktiviteetit. Täältä voit varata
              kalastusretkesi Funny Fishing in Finlandin kanssa.
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
              Kalastusopas & kokki Anssi Ryhänen
              <br />
              Laadukas yksityinen kalastusretki kokeneen oppaan kanssa
              Pohjois-Karjalan vesillä.
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
