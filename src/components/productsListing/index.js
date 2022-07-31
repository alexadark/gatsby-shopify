import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import AddToCart from "../cart/AddToCart"

const PRODUCTS_QUERY = graphql`
  query {
    allShopifyProduct(sort: { fields: publishedAt, order: ASC }, limit: 10) {
      nodes {
        title
        id
        handle
        description
        productType
        variants {
          shopifyId
          title
          price
          availableForSale
        }
        images {
          gatsbyImageData(layout: CONSTRAINED)
          altText
          id
        }
      }
    }
  }
`

export const ProductsListing = () => {
  const data = useStaticQuery(PRODUCTS_QUERY)
  const products = data.allShopifyProduct.nodes
  return (
    <div>
      <h1>Products</h1>
      <div className="grid grid-cols-3 gap-8">
        {products.map(product => (
          <div key={product.id}>
            <h2>{product.title}</h2>
            <GatsbyImage
              image={product.images[0].gatsbyImageData}
              alt={product.images[0].altText}
              className="my-3 border"
            />
            <p>{product.variants[0].price}$</p>
            <AddToCart />
          </div>
        ))}
      </div>
    </div>
  )
}
