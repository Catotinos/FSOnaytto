import { useEffect, useState } from "react";

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

  useEffect(() => {
    fetch("http://localhost:3001/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogPosts(data));
  }, []);

  return (
    <div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <h1 style={{ color: "black", textAlign: "center" }}>Blogit</h1>

        <div style={{ margin: "40px auto", maxWidth: 600 }}>
          {blogPosts.map((post, idx) => (
            <div
              key={idx}
              style={{
                background: "#fff",
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
                {post.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
