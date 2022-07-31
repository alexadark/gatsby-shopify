import React from "react"

const AddToCart = () => {
  return (
    <button
      className="px-4 py-2 font-bold text-white bg-purple-700 rounded"
      onClick={() => console.log("added to cart")}
    >
      Add To Cart
    </button>
  )
}

export default AddToCart
