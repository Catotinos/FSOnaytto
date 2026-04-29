import {useState } from "react";
import blogService from '../services/blogs'
import Togglable from './togglable'

  const grid = {
    display: "grid",
    placeItems: "center",
    gridRowGap: "5px"
  }

  const bigger = {
    borderStyle: "solid black",
    borderWidth: "1px",
    width: "15vw",
    height: "2vw",
    fontSize: "1em",
    maxWidth: "100%",
    minWidth: "200px",
    minHeight: "20px"
  }
  const bloginput = {
    borderStyle: "solid black",
    borderWidth: "1px",
    width: "30vw",
    height: "30vw",
    fontSize: "1em",
    maxWidth: "100%",
    minWidth: "200px",
    minHeight: "20px"
  }
const Blog = ({ blog }) => {
  const [blogdate, setBlogdate] = useState(blog.date)
  const [blogtext, setBlogtext] = useState(blog.text)
  const blogStyle = {
    padding: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 3,
    marginBottom: 5
  }

  const editblog = async event => {
    event.preventDefault()

    const updatedblog = {
      text: blogtext,
      date: blogdate,
      user: blog.user,
    }
    blogService.update(blog.id, updatedblog)
  }
  const Delete = (blog) => {
    blogService.deleteblog(blog.id)
  }

  const blogeditform= () => {
    
    return (
    <form onSubmit={editblog}>
        <div style={grid}>
          <h3>Päivämäärä</h3>
            <input style={bigger}
              type="text"
              value={blogdate}
              onChange={({ target }) => setBlogdate(target.value)}
            />
          <h3>Bloginsisältö</h3>
            <textarea style={bloginput}
              type="text"
              value={blogtext}
              onChange={({ target }) => setBlogtext(target.value)}
            />
          <button type="submit">Julkaise</button>
          <button onClick={()=>Delete(blog)}>Poista</button>
        </div>
      </form>
    )
  }

  return(
  <div style={{...grid, ...blogStyle}}>
    <div>
      <h1>{blog.date}</h1>
      
    </div>
    <Togglable buttonLabel="Muokkaa">
      
      {blogeditform()}
    </Togglable>
  </div>
  )
}

export default Blog