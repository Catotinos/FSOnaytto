import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./app";
import { LanguageProvider } from "./components/LanguageProvider";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="*" element={<App />} />),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <LanguageProvider>
    <RouterProvider router={router} />
  </LanguageProvider>,
);
