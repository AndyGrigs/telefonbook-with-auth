import React from 'react'

const Navigation = () => {
  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `mr-4 text-gray-700 hover:text-blue-600 ${isActive ? 'text-blue-600 font-semibold' : ''}`
        }
      >
        Home
      </NavLink>
      {/* {isLoggedIn && (
        <NavLink
          to="/contacts"
          className={({ isActive }) =>
            `text-gray-700 hover:text-blue-600 ${isActive ? 'text-blue-600 font-semibold' : ''}`
          }
        >
          Contacts
        </NavLink>
      )} */}
    </nav>
  )
}

export default Navigation