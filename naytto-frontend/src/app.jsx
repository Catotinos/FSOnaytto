import { useState /* useEffect */ } from "react";
import HomePage from "./components/HomePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

const App = () => {
  const [user /* setUser */] = useState(null);
  /* const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); */

  const padding = {
    padding: 5,
  };

  const location = useLocation(); // Finds the location of the current page

  return (
    <div>
      <div>
        <Link style={padding} to="">
          Etusivu
        </Link>
        <Link style={padding} to="/blogs">
          Blogit
        </Link>
      </div>
      <div>
        {user ? ( // If the user has logged in, the page displays a log out button.
          <>
            <p>
              Kirjautunut sisään käyttäjänä {user.name}{" "}
              <button /* onClick={handleLogOut} */>Kirjaudu ulos</button>
            </p>
          </>
        ) : (
          // If the user hasn't logged in, the page displays a log in button.
          location.pathname !== "/login" && (
            <Link style={padding} to="/login">
              Kirjaudu sisään
            </Link>
          )
        )}
      </div>
      <div>
        <Routes>
          <Route
            path=""
            element={
              <>
                <HomePage />
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
