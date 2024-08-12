import { graphql, useStaticQuery } from 'gatsby';

export const GetEvents = () => {
    const data = useStaticQuery(graphql`
        query{
            shopifyCollection(handle: {eq: "events"}) {
                products {
                    title
                    handle
                    vendor
                    status
                    totalInventory
                    variants {
                        title
                        price
                        shopifyId
                    }
                    metafields {
                        key
                        value
                    }
                    descriptionHtml
                    featuredImage {
                        gatsbyImageData
                    }
                    priceRangeV2 {
                        maxVariantPrice {
                            amount
                            currencyCode
                        }
                    }
                }
            }
        }
    `)

    return data.shopifyCollection.products;
}