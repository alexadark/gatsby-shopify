import React, { createContext, useState, useEffect } from "react"
import Client from "shopify-buy"

const client = Client.buildClient({
  domain: process.env.GATSBY_SHOPIFY_STORE_URL,
  storefrontAccessToken: process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
})

const defaultValues = {
  isCartOpen: false,
  toggleCartOpen: () => {},
  cart: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  checkCoupon: () => {},
  client,
  checkout: {
    lineItems: [],
  },
}

export const StoreContext = createContext(defaultValues)

export const StoreProvider = ({ children }) => {
  const [isCartOpen, setCartOpen] = useState(false)
  const toggleCartOpen = () => setCartOpen(!isCartOpen)
  const isBrowser = typeof window !== "undefined"

  const [checkout, setCheckout] = useState(defaultValues.checkout)

  const getNewId = async () => {
    try {
      const newCheckout = await client.checkout.create()
      isBrowser && localStorage.setItem("checkout_id", newCheckout.id)
      return newCheckout
    } catch (e) {
      console.error(e)
    }
  }

  const initializeCheckout = async () => {
    try {
      //check if id exists
      const currentCheckoutId = isBrowser
        ? localStorage.getItem("checkout_id")
        : null

      let newCheckout = null

      if (currentCheckoutId) {
        //if id exists fetch checkout from shopify
        newCheckout = await client.checkout.fetch(currentCheckoutId)
        if (newCheckout.completedAt) {
          newCheckout = await getNewId()
        }
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

      const newCheckout = await client.checkout.addLineItems(
        checkout.id,
        lineItems
      )
      //buy now button code
      // window.open(newCheckout.webUrl, "_blank")
      setCheckout(newCheckout)
      console.log(newCheckout.webUrl)
    } catch (error) {
      console.error(error)
    }
  }

  const removeProductFromCart = async lineItemId => {
    try {
      const newCheckout = await client.checkout.removeLineItems(checkout.id, [
        lineItemId,
      ])

      setCheckout(newCheckout)
    } catch (error) {
      console.error(error)
    }
  }

  const checkCoupon = async coupon => {
    const newCheckout = await client.checkout.addDiscount(checkout.id, coupon)
    setCheckout(newCheckout)
  }

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        addProductToCart,
        checkout,
        toggleCartOpen,
        isCartOpen,
        removeProductFromCart,
        checkCoupon,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
