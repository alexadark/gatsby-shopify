import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { FaShoppingCart } from "react-icons/fa"
import { StoreContext } from "../context/StoreContext"
import Cart from "./cart/Cart"
import Loader from "./Loader"

const Header = ({ siteTitle }) => {
  const { isCartOpen, toggleCartOpen, checkout, isLoading } =
    useContext(StoreContext)

  const qty = checkout.lineItems.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  return (
    <>
      <header className="py-3 bg-purple-700">
        <div className="container flex items-center justify-between px-5 mx-auto">
          <div className=" navbar-brand">
            <Link to="/" className="font-bold text-white uppercase navbar-item">
              Gatsby-shopify
            </Link>
          </div>
          <div className="navbar-end">
            <button onClick={toggleCartOpen}>
              <div className="text-white">{qty}</div>
              <FaShoppingCart
                style={{ color: "white", height: 30, width: 30 }}
              />
            </button>
          </div>
        </div>
        {isCartOpen && <Cart />}
      </header>
      <Loader isLoading={isLoading} />
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
