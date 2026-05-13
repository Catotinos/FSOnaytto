import { useEffect, useState } from "react";

import { useLang } from "./LanguageContext";

const BlogStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "75%",
  zIndex: "1",
};

const BlogsPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  const [, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogPosts(data));
  }, []);

  const { t } = useLang();

  const mainDiv = {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
    userSelect: "none",
    WebkitUserSelect: "none",
    msUserSelect: "none",
  };

  return (
    <div style={{ ...mainDiv }}>
      <div style={{ position: "relative", zIndex: 1 }}>
        <h1 style={{ color: "black", textAlign: "center" }}>Blogit</h1>

        <div style={{ margin: "10px auto", maxWidth: 600 }}>
          {blogPosts.map((post, idx) => (
            <div
              key={idx}
              style={{
                background: "#d3d3d3b4",
                border: "1px solid black",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                marginBottom: 32,
                padding: 24,
                textAlign: "center",
              }}
            >
              <div style={{ fontWeight: "bold", marginBottom: 8 }}>
                {post.date}
              </div>
              <img
                src={post.image}
                alt="blog"
                style={{ width: "100%", borderRadius: 4, marginBottom: 12 }}
              />
              <div style={{ color: "#333", textAlign: "center" }}>
                {idx === 0 ? t("blogContents.blog1") : post.text}{" "}
                {/* Makes it so that the latest blog always uses the blogContents.blog1 translation */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
