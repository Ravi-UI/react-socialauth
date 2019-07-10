import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import { groupBy } from "underscore"
import Helmet from 'react-helmet';
import Layout from "../components/layout"

import "../utils/css/awards.css"
import SEO from "../components/seo"

class awards extends React.Component {
  render() {
    const { data } = this.props
    // console.log(data);
    const awardsObjArray =
      data.allSanityAwards &&
      data.allSanityAwards.edges.map(edge => {
        return {
          id: edge.node.id,
          title: edge.node.title,
          year: edge.node.year,
          description: edge.node.description,
        }
      })
    const awards = groupBy(awardsObjArray, "year")
    const years = Object.keys(awards)
    return (
      <Layout>
        <SEO
          title={`Awards|Architect|Restaurant Designer|Boston,MA`}
          description={`Whitlock Design Group is a leader in restaurant and hospitality design with an extensive portfolio of dynamic and innovative retail, restaurant and entertainment venues.Trillium BostonTrillium BostonTrillium BostonTrillium BostonTrillium BostonTrillium BostonTrillium BostonTrillium BostonTrillium BostonTrillium BostonTrillium BostonTrillium BostonTrillium BostonTrillium BostonTrillium BostonTrillium BostonTrillium BostonTrillium ${Math.random()}`}
        />

        <Helmet>
          <link rel="canonical" href="/awards" />
        </Helmet>
        <div className="nav-avoider" />
        <div className="awardsContainer">
          <div className="tabs">
            <input
              name="tabs"
              type="radio"
              id="tab-2"
              className="input"
              defaultChecked
            />
            <label htmlFor="tab-2" className="label">
              Client List
            </label>
            <div className="panel">
              <div className="row">
                <div className="newspaper">
                  <span>
                    {data.allSanityClient.edges.map((edge, index) => {
                      return (
                        <p
                          className="newspaper-child"
                          key={`${edge.node.id}-${index}`}
                        >
                          {edge.node.title}
                        </p>
                      )
                    })}
                  </span>
                </div>
              </div>
            </div>

            <input name="tabs" type="radio" id="tab-3" className="input" />
            <label htmlFor="tab-3" className="label">
              Press & Awards
            </label>
            <div className="panel">
              <div className="press-pics-wrapper">
                {data.allSanityPress.edges.map((edge, index) => {
                  return (
                    <a
                      href={edge.node.website}
                      key={`${edge.node.website}-${index}`}
                    >
                      <div className="press-pic-holder">
                        <img
                          src={edge.node.image.asset.url}
                          className="press-pic"
                          alt="Interior design"
                          title="Interior design"
                        />
                      </div>
                    </a>
                  )
                })}
              </div>

              <div className="container">
                {years.map((year, index) => {
                  return (
                    <div className="wrapper" key={year}>
                      {awards[`${year}`].map((edge, index) => {
                        return (
                          <p key={edge.id} className="award">
                            <span>{year} | </span>
                            <span className="award-title">
                              {" "}
                              {edge.title} |{" "}
                            </span>
                            <span className="award-description">
                              {edge.description}
                            </span>
                          </p>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default awards

export const query = graphql`
  query allPressClient {
    allSanityPress {
      edges {
        node {
          id
          title
          website
          image {
            asset {
              id
              url
            }
          }
        }
      }
    }

    allSanityClient {
      edges {
        node {
          id
          title
        }
      }
    }

    allSanityAwards(sort: { order: DESC, fields: year }) {
      edges {
        node {
          id
          title
          year
          description
        }
      }
    }
  }
`
