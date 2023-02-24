import React from 'react'

const NavBarLogo = ({ toggleOpen }) => {
  return (
    <div className="logo-container">
      <div className={`on ${toggleOpen ? 'open' : 'closed'}`}>
        <h2>On</h2>
      </div>
      <div className={`task ${toggleOpen ? 'open' : 'closed'}`}>
        <h2>Task</h2>
      </div>


    </div>
  )
}

export default NavBarLogo
