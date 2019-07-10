exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createPageDependency } = actions

  const result = await graphql(`
    query allPortfolio{
        allSanityPortfolio {
          edges {
            node
             {
              title,
              slug{
                _type,
                current
              },
              portfolioImages{
                id,
                title,
                image{
                  _type,
                  asset {
                    id,
                    url
                  }
                }
              }
            }
          }
        }
      }
    `)

  if (result.errors) {
    throw result.errors
  }

  const projects = result.data.allSanityPortfolio.edges || []
  projects.forEach((edge, index) => {
    const path = `/portfolio/${edge.node.slug && edge.node.slug.current}`

    createPage({
      path,
      component: require.resolve("./src/templates/viewportfolio.js"),
      context: { data: edge.node },
    })

    createPageDependency({ path, nodeId: edge.node.id })
  });

  const blogsResult = await graphql(`
  query allPostBlogs{
    allSanityPost{
      edges{
        node{
          id,
          title,
          publishedAt,
          mainImage{
            asset{
              id,
              url
            }
          }
          _createdAt,
          slug{
            current
          },
          body{
            _key,
            _type,
            children{
              _key,
              _type,
              text
            },
            asset {
              url
            }
            style
          },
          categories {
            id
            title
          },
          author{
            id,
            name,
            image{
              asset{
                url
              }
            },
            bio{
              style
            },
            image{
              asset{,
                id,
                url
              }
            }
          }
        }
      }
    }
  }
    `);

  const categoriesResult = await graphql(`
      {
        allSanityCategory{
         edges{
          node{
            id
            title
          }
        }
        }
    }`);
const commentResult = await graphql(`
      {
      allSanityComment{
        edges{
          node{
            id
            postId
            comment
            publish
            firstName
            commentedBy
            _createdAt
          } 
        }
      }
    }`);
  const blogs = blogsResult.data.allSanityPost.edges || []
  const categories = categoriesResult.data.allSanityCategory.edges || []
  const comments = commentResult.data.allSanityComment.edges || []
  blogs.forEach((edge, index) => {
    const path = `/blogs/${edge.node.slug.current}`

    createPage({
      path,
      component: require.resolve("./src/templates/blogTemplate.js"),
      context: { data: edge.node, postList: blogs, categories: categories, comments: comments },
    })

    createPageDependency({ path, nodeId: edge.node.id })
  })
}