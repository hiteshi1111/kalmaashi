import { graphql, useStaticQuery } from 'gatsby';

export const GetAll = () => {
    const data = useStaticQuery(graphql`
        query{
            allShopifyCollection(filter: {handle: {ne: "events"}}) {
                edges {
                    node {
                        handle
                        title
                        description
                        image {
                          gatsbyImageData
                          altText
                        }
                        products {
                            title
                            handle
                            featuredImage {
                                gatsbyImageData
                                altText
                            }
                            variants {
                                price
                                compareAtPrice
                            }
                        }
                    }
                }
            }
            allShopifyProduct(filter: {collections: {elemMatch: {title: {nin: ["Events", "Blogs"]}}}}) {
                edges {
                    node {
                        title
                        handle
                        shopifyId
                        totalInventory
                        vendor
                        collections {
                            title
                        }
                        featuredImage {
                            gatsbyImageData
                            altText
                        }
                        variants {
                            price
                            compareAtPrice
                        }
                    }
                }
            }
        }
    `)

    return data;
}