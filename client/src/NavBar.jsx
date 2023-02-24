import React, { useState } from 'react'
import NewTodo from './NewTodo'
import NavBarLogo from './NavBarLogo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightToBracket as arrowIcon,
  faUserCircle as userIcon,
  faTasks as listIcon,
  faCog as cogIcon,
  faBars as barsIcon,
  faCalendar as calendarIcon,
  faList
} from '@fortawesome/free-solid-svg-icons'
import NavBarItem from './NavBarItem'

const NavBar = ({ dispatch }) => {
  const [toggleOpen, setToggleOpen] = useState(false)
  const [showNewTodo, setShowNewTodo] = useState(false)

  return (
    <>
      <div className={`navbar ${toggleOpen ? 'open' : 'closed'}`}>
        <FontAwesomeIcon
          icon={barsIcon}
          onClick={() => setToggleOpen(!toggleOpen)}
        />

        <div className="navbar-main">
          <NavBarItem
            title={'Tasks'}
            icon={listIcon}
            path={'/'}
            toggleOpen={toggleOpen}
          />
          <NavBarItem
            title={'Lists'}
            icon={faList}
            path={'/'}
            toggleOpen={toggleOpen}
          />
          <NavBarItem
            title={'Events'}
            icon={calendarIcon}
            path={'/'}
            toggleOpen={toggleOpen}
          />

        </div>
        <div className="navbar-bottom">
          <NavBarItem
            title={'Account'}
            icon={userIcon}
            path={'/'}
            toggleOpen={toggleOpen}
          />
          <NavBarItem
            title={'Settings'}
            icon={cogIcon}
            path={'/'}
            toggleOpen={toggleOpen}
          />
          <NavBarItem
            title={'Logout'}
            icon={arrowIcon}
            path={'/'}
            toggleOpen={toggleOpen}
          />

          <NewTodo dispatch={dispatch} showNewTodo={showNewTodo} setShowNewTodo={setShowNewTodo} />
        </div>
      </div>
    </>
  )
}

export default NavBar
