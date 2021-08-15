module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        defaultLayouts: {
          default: require.resolve('./src/components/layout')
        }
      }
    },
    {
      resolve: 'gatsby-plugin-theme-ui',
      // options: {
      //   preset: "@theme-ui/preset-funk",
      // },
    },
  ]
}
