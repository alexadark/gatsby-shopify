import React, { useContext } from "react"
import { StoreContext } from "../../context/StoreContext"

const AddToCart = ({ variantId }) => {
  const { addProductToCart } = useContext(StoreContext)
  return (
    <button
      className="px-4 py-2 font-bold text-white bg-purple-700 rounded"
      onClick={() => addProductToCart(variantId)}
    >
      Add To Cart
    </button>
  )
}

export default AddToCart
