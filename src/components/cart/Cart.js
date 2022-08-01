import React, { useContext } from "react"
import { StoreContext } from "../../context/StoreContext"

const Cart = () => {
  const { checkout, toggleCartOpen } = useContext(StoreContext)
  console.log("checkout", checkout.lineItems)

  return (
    <div className="fixed top-0 right-0 z-10 w-1/2 h-full p-5 bg-white shadow-2xl">
      <div className="flex justify-end">
        <button className="p-3" onClick={toggleCartOpen}>
          close
        </button>
      </div>
      {checkout.lineItems.map(item => {
        console.log(item.variant)

        return (
          <div key={item.id}>
            <div className="flex items-center gap-5">
              <img src={item.variant.image.src} alt="" className="h-[75px]" />
              <h4>{item.title}</h4>
            </div>
            <p>
              {item.variant.priceV2.amount}
              {item.variant.priceV2.currencyCode}
            </p>
            <p>{item.quantity}</p>
          </div>
        )
      })}
      <p>
        Total: {checkout.totalPriceV2.amount}
        {checkout.totalPriceV2.currencyCode}
      </p>
    </div>
  )
}

export default Cart
