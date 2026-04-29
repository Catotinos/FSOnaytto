import { useState } from "react";
import { LanguageContext, translations } from "./LanguageContext";

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem("appLang") || "fi");

  const switchLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem("appLang", newLang);
  };

  const t = (key) => {
    return (
      key
        .split(".")
        .reduce((obj, i) => (obj ? obj[i] : null), translations[lang]) || key
    );
  };

  return (
    <LanguageContext.Provider value={{ lang, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
