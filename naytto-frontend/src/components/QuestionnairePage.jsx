import { useState, useEffect } from "react";
import { Form, Routes, Route } from "react-router-dom";

import questionService from "../services/question";
import { useLang } from "./LanguageContext";

const QuestionnairePage = () => {
  const [topic, setTopic] = useState(null);
  const [question, setQuestion] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [agreement, setAgreement] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mainDiv = {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box",
    userSelect: "none",
    WebkitUserSelect: "none",
    msUserSelect: "none",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
    maxWidth: "600px",
  };

  const inputGroup1 = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    gap: "15px",
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
    width: "100%",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    boxSizing: "border-box",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

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
      phoneNumber: phoneNumber,
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

  const { t } = useLang();

  return (
    <>
      <div style={{ ...mainDiv, backgroundColor: "white" }}>
        {/* <div> */}
        {/* Contacts can be found here */}
        {/* <h1>{t("contactsTitle")}</h1> */}
        {/* </div> */}
        <div>
          {" "}
          {/* Form starts here */}
          <h1>{t("formTitle")}</h1>
          <Form onSubmit={addQuestionnaire} style={formStyle}>
            {/* Radio Group */}
            <div style={{ ...inputGroup1 }}>
              <label style={{ display: "flex", gap: "5px" }}>
                <input
                  type="radio"
                  name="topic"
                  value="1"
                  checked={topic === "1"}
                  onChange={(e) => setTopic(e.target.value)}
                />{" "}
                {t("formContents.option1")}
              </label>
              <label style={{ display: "flex", gap: "5px" }}>
                <input
                  type="radio"
                  name="topic"
                  value="2"
                  checked={topic === "2"}
                  onChange={(e) => setTopic(e.target.value)}
                />{" "}
                {t("formContents.option2")}
              </label>
              <label style={{ display: "flex", gap: "5px" }}>
                <input
                  type="radio"
                  name="topic"
                  value="3"
                  checked={topic === "3"}
                  onChange={(e) => setTopic(e.target.value)}
                />{" "}
                {t("formContents.option3")}
                <br />
                {t("formContents.option3part2")}
              </label>
            </div>

            {/* Question Area */}
            <div style={inputGroup2}>
              <label htmlFor="question">{t("formContents.questionBox")}</label>
              <textarea
                id="question"
                style={{
                  ...inputStyle,
                  minHeight: "100px",
                  resize: "vertical",
                }}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            {/* Name Row */}
            <div style={rowLayout}>
              <div style={{ ...inputGroup2, flex: "1 1 250px" }}>
                <label>{t("formContents.firstName")}</label>
                <input
                  type="text"
                  style={{ ...inputStyle }}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div style={{ ...inputGroup2, flex: "1 1 250px" }}>
                <label>{t("formContents.lastName")}</label>
                <input
                  type="text"
                  style={{ ...inputStyle }}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            {/* Contact Row */}
            <div style={rowLayout}>
              <div style={{ ...inputGroup2, flex: "1 1 250px" }}>
                <label>{t("formContents.phoneNumber")}</label>
                <input
                  type="tel"
                  style={{ ...inputStyle }}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div style={{ ...inputGroup2, flex: "1 1 250px" }}>
                <label>{t("formContents.email")}</label>
                <input
                  type="email"
                  style={{ ...inputStyle }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            {/* Agreement */}
            <div
              style={{
                borderTop: "1px solid #ccc",
                paddingTop: "15px",
                width: "100%",
              }}
            >
              <p style={{ fontSize: "14px", lineHeight: "1.4" }}>
                {t("formContents.consentText")}
              </p>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={agreement}
                  onChange={(e) => setAgreement(e.target.checked)}
                />
                {t("formContents.consentBox")}
              </label>
            </div>
            <button
              type="submit"
              style={{
                ...inputStyle,
                backgroundColor: "#007bff",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {t("formContents.submit")}
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default QuestionnairePage;
