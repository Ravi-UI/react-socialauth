import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Carousel from '../components/Carousel';
import WhoWeAre from '../components/WhoWeAre';
import scrollDownBtn from '../components/scrollDown';
import Helmet from 'react-helmet';
// Images
import viewmorebg from '../images/viewmorebg.png';

import '../utils/css/portfolio.css';
import '../components/carousel.css';

import ReactGA from 'react-ga';

export default function Index(props) {
	let titles = [];

	const carouselImages = props.data.allSanityCarousel.edges.map((edge) => {
		// carousel title is available in edges.node.title
		titles.push(edge.node.title);
		return edge.node.image.asset.url;
	});

	function initializeReactGA() {
		ReactGA.initialize('UA-138436921-1');
		ReactGA.pageview('/');
	}
	initializeReactGA();

	// console.log(props.data.allSanityCarousel.edges, 'kaflz')

	return (
		<Layout>
			<SEO
				title={`Whitlock Design Group`}
				description={`Whitlock Design Group, boston based restaurant and interior design with retail, restaurants and interiors Boston, whitlock design group, interior and restaurant designer boston, restaurant design boston.`}
			/>
			<Helmet>
	          <link rel="canonical" href="/" />
	        </Helmet>
			<div id="carousel">
				<Carousel
					images={carouselImages}
					displayFunction={(images, showPic) => {
						return images.map((image, i) => (
							<div
								className="carousel-image"
								style={{
									backgroundImage: `url(${image})`,
									position: 'absolute',
									transition: 'opacity 1s ease',
									opacity: i + 1 === showPic ? '1' : '0'
								}}
								key={`${i}`}
							/>
						));
					}}
					carouselHeight="100vh"
					carouselOverlay={false}
					carouselTime={3500}
					titles={titles}
					children={(state, props) => <div>{props.titles[state.showPic - 1]}</div>}
				/>
				{scrollDownBtn('portfolio', {
					marginTop: 30,
					left: 0,
					right: 0,
					marginLeft: 'auto',
					marginRight: 'auto'
				})}
			</div>

			<div id="portfolio">
				<div className="portfolio-title-wrapper">
					<h1 className="main-page-portfolio-title">Design Portfolio</h1>
				</div>
				<main className="grid grid-homepage">
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
										title="sample pic"
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
				<div className="main-page-portfolio-btn-wrapper">
					<Link to={`/portfolio/`}>
						<button className="btn">VIEW MORE</button>
					</Link>
				</div>
			</div>

			<WhoWeAre />
			{/* <h2 className="mide">Architect, design, whitlock</h2> */}
		</Layout>
	);
}

export const query = graphql`
	query allSanityPortfolios {
		allSanityPortfolio(sort: { order: ASC, fields: priority }, limit: 6) {
			edges {
				node {
					title
					description
					location
					slug {
						_type
						current
					}
					mainImage {
						asset {
							id
							url
						}
					}
				}
			}
		}
		allSanityCarousel(sort: { order: ASC, fields: priority }) {
			edges {
				node {
					id
					title
					image {
						asset {
							id
							url
						}
					}
				}
			}
		}
	}
`;
