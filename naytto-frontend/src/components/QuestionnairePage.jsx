import { useState } from "react";
import { Form, Routes, Route } from "react-router-dom";

import questionService from "../services/question";

const mainDiv = {
  minHeight: "100vh",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  userSelect: "none",
  WebkitUserSelect: "none",
  msUserSelect: "none",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "100%",
  maxWidth: "500px",
};

const inputGroup1 = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "flex-start", // Aligns text and inputs to the left
  width: "100%",
  gap: "5px",
};

const inputGroup2 = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start", // Aligns text and inputs to the left
  width: "100%",
  gap: "5px",
};

const rowLayout = {
  display: "flex",
  gap: "15px",
  flexWrap: "wrap", // Makes it responsive for mobile
};

const QuestionnairePage = () => {
  const [topic, setTopic] = useState(null);
  const [question, setQuestion] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [agreement, setAgreement] = useState(false);

  const addQuestionnaire = (event) => {
    event.preventDefault();

    if (
      !topic ||
      !question ||
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !email
    ) {
      alert("Täytä koko lomake.");
      return null;
    }

    if (agreement === false) {
      alert(
        "Tarvitsemme suostumuksen, jotta voimme käsitellä tietoja. Täytä suostumus laatikko.",
      );
      return null;
    }

    if (!isValidPhone(phoneNumber)) {
      alert("Syötä voimassa oleva puhelinnumero."); // "Please enter a valid phone number"
      return; // Stop the submission
    }

    submitQuestions({
      topic: topic,
      question: question,
      firstName: firstName,
      lastName: lastName,
      phonenumber: phoneNumber,
      email: email,
      agreement: agreement,
    });

    setTopic(null);
    setQuestion("");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setEmail("");
    setAgreement(false);
  };

  const submitQuestions = (questionObject) => {
    questionService.create(questionObject);
    alert("Kysely lähetetty!");
  };

  const isValidPhone = (phone) => {
    // Pattern: Optional +, then 7-15 digits (allows spaces/dashes)
    const phoneRegex = /^\+?(\d[\d\s.-]{5,14}\d)$/;
    return phoneRegex.test(phone);
  };

  return (
    <>
      <div style={mainDiv}>
        <h1>Kyselylomake</h1>
        <Form onSubmit={addQuestionnaire} style={formStyle}>
          {/* Radio Group */}
          <div style={{ ...inputGroup1, gap: "10px" }}>
            <label>
              <input
                type="radio"
                name="topic"
                value="1"
                checked={topic === "1"}
                onChange={(e) => setTopic(e.target.value)}
              />{" "}
              Kalastus
            </label>
            <label>
              <input
                type="radio"
                name="topic"
                value="2"
                checked={topic === "2"}
                onChange={(e) => setTopic(e.target.value)}
              />{" "}
              Kalastusretket
            </label>
            <label>
              <input
                type="radio"
                name="topic"
                value="3"
                checked={topic === "3"}
                onChange={(e) => setTopic(e.target.value)}
              />{" "}
              Muu kalastusmatkassa
              <br />
              esim. majoitus tai kalastusveneet
            </label>
          </div>

          {/* Question Area */}
          <div style={inputGroup2}>
            <label htmlFor="question">Kirjoita kysymykset tähän</label>
            <textarea
              id="question"
              style={{ width: "95%", padding: "10px" }}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          {/* Name Row */}
          <div style={rowLayout}>
            <div style={{ ...inputGroup2, flex: 1, minWidth: "200px" }}>
              <label>Etunimi</label>
              <input
                type="text"
                style={{ width: "90%", padding: "8px" }}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div style={{ ...inputGroup2, flex: 1, minWidth: "200px" }}>
              <label>Sukunimi</label>
              <input
                type="text"
                style={{ width: "90%", padding: "8px" }}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          {/* Contact Row */}
          <div style={rowLayout}>
            <div style={{ ...inputGroup2, flex: 1, minWidth: "200px" }}>
              <label>Puhelinnumero</label>
              <input
                type="text"
                style={{ width: "90%", padding: "8px" }}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div style={{ ...inputGroup2, flex: 1, minWidth: "200px" }}>
              <label>Sähköpostiosoite</label>
              <input
                type="email"
                style={{ width: "90%", padding: "8px" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          {/* Agreement */}
          <div style={{ borderTop: "1px solid #ccc", paddingTop: "15px" }}>
            <p style={{ fontSize: "14px" }}>
              Tietoja käsittelee Funny Fishing in Finland. Niitä ei käytetä
              markkinointiin eikä jaeta eteenpäin.
            </p>
            <label
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <input
                type="checkbox"
                checked={agreement}
                onChange={(e) => setAgreement(e.target.checked)}
              />
              Kyllä
            </label>
          </div>
          <button type="submit">Lähetä!</button>
        </Form>
      </div>
    </>
  );
};

export default QuestionnairePage;
