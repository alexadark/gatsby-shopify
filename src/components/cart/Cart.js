import React, { useContext } from "react"
import { StoreContext } from "../../context/StoreContext"

const Cart = () => {
  const { checkout, toggleCartOpen, removeProductFromCart } =
    useContext(StoreContext)
  console.log("checkout", checkout.lineItems)

  return (
    <div className="fixed top-0 right-0 z-10 w-1/2 h-full p-5 bg-white shadow-2xl">
      <div className="flex justify-end">
        <button className="p-3" onClick={toggleCartOpen}>
          close
        </button>
      </div>
      {checkout.lineItems.map(item => {
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
            <button
              className="p-1 mb-3 text-white bg-pink-600"
              onClick={() => removeProductFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        )
      })}
      <div className="font-bold uppercase">
        Total: {checkout.totalPriceV2.amount}
        {checkout.totalPriceV2.currencyCode}
      </div>
      <div className="flex justify-end mt-5">
        <a
          href={checkout.webUrl}
          target="_blank"
          className="block w-full p-3 text-center text-white no-underline bg-purple-600 rounded-sm"
        >
          checkout now
        </a>
      </div>
    </div>
  )
}

export default Cart
