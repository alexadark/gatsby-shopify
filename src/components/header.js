import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { FaShoppingCart } from "react-icons/fa"
import { StoreContext } from "../context/StoreContext"
import Cart from "./cart/Cart"

const Header = ({ siteTitle }) => {
  const { isCartOpen, toggleCartOpen } = useContext(StoreContext)

  return (
    <header className="py-3 bg-purple-700">
      <div className="container flex items-center justify-between px-5 mx-auto">
        <div className=" navbar-brand">
          <Link to="/" className="font-bold text-white uppercase navbar-item">
            Gatsby-shopify
          </Link>
        </div>
        <div className="navbar-end">
          <button onClick={toggleCartOpen}>
            <FaShoppingCart style={{ color: "white", height: 30, width: 30 }} />
          </button>
        </div>
      </div>
      {isCartOpen && <Cart />}
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
