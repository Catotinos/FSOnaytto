import { createContext, useContext } from "react";
import { translations } from "./translations";

export const LanguageContext = createContext();

export const useLang = () => useContext(LanguageContext);

export { translations };
