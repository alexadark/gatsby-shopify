import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { FaShoppingCart } from "react-icons/fa"

import logo from "../images/logo.svg"

const Header = ({ siteTitle }) => (
  <header className="bg-purple-700 py-3">
    <div className="container mx-auto flex justify-between items-center">
      <div className="navbar-brand ">
        <Link to="/" className="navbar-item">
          <img
            style={{ height: 60, maxHeight: "none", marginBottom: 0 }}
            src={logo}
            alt="Level Up Logo"
          />
        </Link>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <FaShoppingCart style={{ color: "white", height: 30, width: 30 }} />
        </div>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
