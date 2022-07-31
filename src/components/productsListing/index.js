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
        images: media {
          ... on ShopifyMediaImage {
            id
            alt
            image {
              gatsbyImageData
              altText
            }
          }
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
        {products.map(product => {
          const { images, title, id, variants } = product
          const variantId = variants[0]?.shopifyId

          return (
            <div key={id}>
              <h2>{title}</h2>
              <GatsbyImage
                image={images[0].image.gatsbyImageData}
                alt={images[0].image.altText}
                className="my-3 border"
              />
              <p>{variants[0].price}$</p>
              <AddToCart variantId={variantId} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
