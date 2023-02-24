import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'


const NavBarItem = ({ title, icon, path, toggleOpen }) => {
  const [hover, setHover] = useState(false)

  return (

    <div
      className={`navbar-item ${toggleOpen ? 'expanded' : null}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="title">
        <p>{title}</p>
      </div>
      <div className={`navbar-item-background ${hover ? 'hover-active' : null}`} >
      </div>
    </div>
  )
}

export default NavBarItem
