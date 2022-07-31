import React from "react"
import { StoreProvider } from "./src/context/StoreContext"
import "./src/styles/global.css"
export const wrapRootElement = ({ element }) => {
  return <StoreProvider>{element}</StoreProvider>
}
