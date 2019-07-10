module.exports = {
  siteMetadata: {
    title: `Architect|Restaurant Designer|Boston,MA`,
    description: `Boston Based restaurant designer, interior designer.whitlock design group, boston. Whitlock design, boston. Interior design boston. restaurant design boston.whitlock design group. `,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: "mdtd9fbj",
        dataset: "production",
        // To enable preview of drafts, copy .env-example into .env,
        // and add a token with read permissions
        token: "sk4AZM7KymU0pY6ulnCIrdNgdorcAXIxh4Z6Bung9sjkRKwDcwjgvcqXEhwKacIywcaGBOWBN3jiy4k4Y7x6srfHDnv1NlsIHbO6WkhM8Aao7UjIRGEydrtpNTQCaTvHL0NTz4zRWgy5nwFM0cGyTlLgKaM6icfGbN9UQVNY5phNXncML6hS",
        watchMode: true,
        overlayDrafts: true
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
