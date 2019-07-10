import React from 'react';
import { Link } from 'gatsby';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Helmet from 'react-helmet';
import '../utils/css/portfolio.css';

// Images
import image1 from '../images/portfolio/Bar-Rustic-Bar-Design-feature.jpg';
import image2 from '../images/portfolio/Beekman-icon.jpg';
import image3 from '../images/portfolio/City-Bar-TN.jpg';
import image4 from '../images/portfolio/Hingham-Beer-Works-TN.jpg';
import image5 from '../images/portfolio/Kings-Rosemont-Private-Lanes-Design-TN.jpg';
import image6 from '../images/portfolio/Pagu-Bar-Design-TN.jpg';

const images = [ image1, image2, image3, image4, image5, image6 ];

export default function Index(props) {
	return (
		<Layout>
			<SEO
				title={`Portfolio|Architect|Restaurant Designer|Boston,MA`}
				description={`Whitlock Design Group is a leader in restaurant and hospitality design with an extensive portfolio of dynamic and innovative retail, restaurant and entertainment venues.Trillium Trillium BostonTrillium BostonTrillium BostonTrillium BostonTrillium BostonTrillium BostonTrillium BostonTrillium BostonTrillium BostonTrillium BostonTrillium BostonTrillium BostonTrillium BostonTrillium BostonTrillium BostonTrillium BostonTrillium ${Math.random()}`}
			/>
			<Helmet>
		        <link rel="canonical" href="/portfolio" />
		    </Helmet>
			<div className="nav-avoider" />
			<div className="heading-wrapper">
				<h1 className="heading">Design Portfolio</h1>
			</div>
			<main className="grid">
				{props.data.allSanityPortfolio.edges.map((edge) => {
					return (
						<div key={`"${edge.node.title}"`}>
							<Link
								to={`/portfolio/${edge.node.slug && edge.node.slug.current}`}
								onClick={() => localStorage.setItem('portfolioDescription', edge.node.description)}
							>
								<img
									src={edge.node.mainImage.asset.url}
									alt="Sample photo"
									id="check"
									title="sample photo"
								/>
								<div className="centered-text">
									<p className="portfolio-list-title">{edge.node.title}</p>
									<p>{edge.node.location}</p>
									<p className="view-details-portfolio">VIEW PROJECT</p>

									{/* <p>{edge.node.description}</p> */}
								</div>
							</Link>
						</div>
					);
				})}
			</main>
		</Layout>
	);
}

export const query = graphql`
	query allPortfolio {
		allSanityPortfolio(sort: { order: ASC, fields: priority }) {
			edges {
				node {
					title
					location
					description
					slug {
						_type
						current
					}
					mainImage {
						asset {
							url
							fixed {
								base64
								src
							}
							fluid {
								base64
								src
							}
						}
					}
				}
			}
		}
	}
`;
