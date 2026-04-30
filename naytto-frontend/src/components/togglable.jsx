import { useState } from 'react'
const btnstyle = {
  height: "4vh",
  fontSize: "0.8em"
};
const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button style={btnstyle} onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button style={btnstyle} onClick={toggleVisibility}>Sulje</button>
      </div>
    </div>
  )
}

export default Togglable