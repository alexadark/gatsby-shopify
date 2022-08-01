import React, { createContext, useState, useEffect } from "react"
import Client from "shopify-buy"

const client = Client.buildClient({
  domain: process.env.GATSBY_SHOPIFY_STORE_URL,
  storefrontAccessToken: process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
})

const defaultValues = {
  isCartOpen: false,
  cart: [],
  addProductToCart: () => {
    console.log("added!")
  },
  client,
}
console.log("client", client)
export const StoreContext = createContext(defaultValues)

export const StoreProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [checkout, setCheckout] = useState({})

  const initializeCheckout = async () => {
    try {
      //check if it's a browser
      const isBrowser = typeof window !== "undefined"
      //check if id exists
      const currentCheckoutId = isBrowser
        ? localStorage.getItem("checkout_id")
        : null

      let newCheckout = null

      if (currentCheckoutId) {
        //if id exists fetch checkout from shopify
        newCheckout = await client.checkout.fetch(currentCheckoutId)
      } else {
        //if id doesn't exist create checkout in shopify
        newCheckout = await client.checkout.create()
        isBrowser && localStorage.setItem("checkout_id", newCheckout.id)
      }
      //set checkout to state
      setCheckout(newCheckout)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    initializeCheckout()
  }, [])

  const addProductToCart = async variantId => {
    try {
      const lineItems = [
        {
          variantId,
          quantity: 1,
        },
      ]

      const addItems = await client.checkout.addLineItems(
        checkout.id,
        lineItems
      )
      //buy now button code
      // window.open(addItems.webUrl, "_blank")
      console.log(addItems.webUrl)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <StoreContext.Provider value={{ ...defaultValues, addProductToCart }}>
      {children}
    </StoreContext.Provider>
  )
}
