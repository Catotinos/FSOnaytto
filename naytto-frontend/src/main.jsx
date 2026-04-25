import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./app";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="*" element={<App />} />),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
