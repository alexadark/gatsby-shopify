import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { FaShoppingCart } from "react-icons/fa"
import { StoreContext } from "../context/StoreContext"

import logo from "../images/logo.svg"

const Header = ({ siteTitle }) => {
  const { isCartOpen, cart, addProductToCart, client } =
    useContext(StoreContext)
  debugger
  return (
    <header className="py-3 bg-purple-700">
      <div className="container flex items-center justify-between mx-auto">
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
            <FaShoppingCart
              onClick={addProductToCart}
              style={{ color: "white", height: 30, width: 30 }}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
