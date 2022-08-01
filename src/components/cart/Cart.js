import React, { useContext } from "react"
import { StoreContext } from "../../context/StoreContext"

const Cart = () => {
  const { checkout, toggleCartOpen } = useContext(StoreContext)
  console.log("checkout", checkout.lineItems)
  return (
    <div className="fixed top-0 right-0 z-10 w-1/2 h-full bg-white shadow-2xl">
      <div className="flex justify-end">
        <button className="p-3" onClick={toggleCartOpen}>
          close
        </button>
      </div>
      {checkout.lineItems.map(item => {
        console.log(item.variant)

        return (
          <div key={item.id}>
            <h4>{item.title}</h4>
            <p>{item.variant.price}$</p>
            <p>{item.quantity}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Cart
