import { useEffect, useState } from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";
/* eslint-disable */
import Togglable from "./togglable";
import Blog from "./Blog";
const main = {
  fontSize: "1.2em",
  top: "10%",
  width: "100vw",
  overflowY: "auto",
  height: "auto",
  placeItems: "center",
};

const grid = {
  display: "grid",
  placeItems: "center",
  gridRowGap: "5px",
};
const bigger = {
  borderStyle: "solid black",
  borderWidth: "1px",
  width: "15vw",
  height: "2vw",
  fontSize: "1em",
  maxWidth: "100%",
  minWidth: "200px",
  minHeight: "20px",
};
const bloginput = {
  borderStyle: "solid black",
  borderWidth: "1px",
  width: "30vw",
  height: "30vw",
  fontSize: "1em",
  maxWidth: "100%",
  minWidth: "200px",
  minHeight: "20px",
};
const btnstyle = {
  height: "4vh",
  fontSize: "0.8em",
};

const errormsg = {
  fontSize: "2em",
};
const LoginPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [blogdate, setBlogdate] = useState("");
  const [blogtext, setBlogtext] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorcolour, setErrorColour] = useState("green");
  const getallblogs = async () => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  };
  useEffect(() => {
    getallblogs();
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.error);
      setErrorColour(`red`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }

    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 1024);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  };
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div
        style={{
          ...grid,
          marginTop: "39vh",
          backgroundColor: "white",
          marginBottom: "39vh",
        }}
      >
        <div>
          <label>
            username
            <input
              style={bigger}
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              style={bigger}
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </div>
    </form>
  );
  const adminpage = () => (
    <div style={{ ...grid, backgroundColor: "white", marginTop: "10vh" }}>
      <h2>Kirjauduttu järjestelmänvalvojana</h2>
      <div>
        <button style={btnstyle} onClick={() => logout()}>
          Kirjaudu ulos
        </button>
        <button style={btnstyle} onClick={() => getallblogs()}>
          Päivitä sivu
        </button>
      </div>

      <Togglable buttonLabel="Uusi Blogi">{newblogform()}</Togglable>
      <div>
        <h1>blogit</h1>
      </div>
      <div style={{ ...grid, backgroundColor: "white", marginBottom: "25vh" }}>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );

  const newblogform = () => (
    <form onSubmit={addBlog}>
      <div style={{ ...grid, backgroundColor: "white" }}>
        <h3>Päivämäärä</h3>
        <input
          style={bigger}
          type="text"
          value={blogdate}
          onChange={({ target }) => setBlogdate(target.value)}
        />
        <h3>Bloginsisältö</h3>
        <textarea
          style={bloginput}
          type="text"
          value={blogtext}
          onChange={({ target }) => setBlogtext(target.value)}
        />
        <button style={btnstyle} type="submit">
          Julkaise
        </button>
      </div>
    </form>
  );

  const addBlog = () => (
    event.preventDefault(),
    blogService
      .create({
        date: blogdate,
        text: blogtext,
      })
      .then((response) => {
        setBlogs(blogs.concat(response));
        setBlogdate("");
        setBlogtext("");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.error);
        setErrorColour(`red`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 10000);
      }),
    setErrorMessage("blogi lisätty onnistuneesti"),
    setErrorColour(`green`),
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000)
  );

  const logout = () => (window.localStorage.clear(), setUser(""));

  return (
    <section style={{ ...main, backgroundColor: "white" }}>
      <div>
        <Notification
          message={errorMessage}
          color={errorcolour}
          style={errormsg}
        />
      </div>
      {!user && loginForm()}
      {user && <div>{adminpage()}</div>}
    </section>
  );
};

const Notification = ({ message, color, style }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="error" style={{ ...style, color: color }}>
      {message}
    </div>
  );
};
export default LoginPage;
