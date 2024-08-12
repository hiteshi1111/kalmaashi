/**
 * @type {import('gatsby').GatsbyConfig}
 */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {
    title: `Kalmaashi`,
    siteUrl: `https://www.kalmaashi.com`
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-layout",
    {
      resolve: "gatsby-source-shopify",
      options: {
        password: process.env.SHOPIFY_APP_PASSWORD,
        storeUrl: process.env.SHOPIFY_APP_URL,
        shopifyConnections: ['collections']
      },
    },
    "gatsby-plugin-image",
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`, `png`],
          placeholder: `blurred`,
          backgroundColor: `transparent`,
        },
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
      },
    },
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: process.env.GOOGLE_TAG,
        head: true,
        anonymize: true,
      },
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Kalmaashi`,
        short_name: `Kalmaashi`,
        start_url: `/`,
        icon: `src/images/favicon.webp`,
      },
    },
    "gatsby-transformer-sharp",
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.kalmaashi.com/',
        sitemap: 'https://www.kalmaashi.com/sitemap-0.xml',
        policy: [{userAgent: '*', disallow: ['/']}]
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/`
      },
    },
  ]
};