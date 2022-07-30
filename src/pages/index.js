import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { ProductsListing } from "../components/productsListing"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <ProductsListing />
  </Layout>
)

export const Head = () => <Seo title="Home" />

export default IndexPage
