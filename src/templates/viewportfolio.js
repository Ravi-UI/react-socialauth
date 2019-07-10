import React from 'react';
import Lightbox from 'react-images';

import Layout from '../components/layout';
import theme from '../utils/previewTheme';
import '../utils/css/portfolio.css';

// Images
import fbIcon from '../images/portfolio/facebook.png';
import pinterestIcon from '../images/portfolio/pinterest.png';
import twitterIcon from '../images/portfolio/twitter.png';
import Helmet from 'react-helmet';
import SEO from '../components/seo';

import {
	FacebookShareButton,
	GooglePlusShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	PinterestShareButton,
	FacebookIcon,
	TwitterIcon,
	PinterestIcon
} from 'react-share';

function SocialMedia({ url }) {
	return (
		<div className="social-media-pics-holder">
			<FacebookShareButton
				quote={url}
				className="social-media-pic"
				hashtag="#whitlockdesigns"
				url="https://www.whitlockdesigns.com"
			>
				<FacebookIcon size={12} round className="social-media-pic" />
			</FacebookShareButton>
			<TwitterShareButton
				title={url}
				// via="https://my-facebook-link.com"
				hashtags={[ 'whitlockdesigns', 'architecture' ]}
				className="social-media-pic"
				url="https://www.whitlockdesigns.com"
			>
				<TwitterIcon size={12} round className="social-media-pic" />
			</TwitterShareButton>
			<PinterestShareButton
				media={url}
				description=""
				className="social-media-pic"
				url="https://www.whitlockdesigns.com"
			>
				<PinterestIcon size={12} round className="social-media-pic" />
			</PinterestShareButton>
		</div>
	);
}

const Caption = (props) => {
	return (
		<div className="captions-holder">
			<div className="caption-wrapper">
				<label>{props.caption}</label>
			</div>
			<SocialMedia url={props.url} />
		</div>
	);
};

class ViewProject extends React.Component {
	state = {
		openPreview: false,
		currentImage: 0
	};

	showPreview = () => {
		this.setState({ openPreview: true });
	};

	gotoPrevious = () => {
		this.setState({
			currentImage: this.state.currentImage - 1
		});
	};

	gotoNext = () => {
		this.setState({
			currentImage: this.state.currentImage + 1
		});
	};

	closeLightbox = () => {
		this.setState({
			currentImage: 0,
			openPreview: false
		});
	};

	gotoImage = (index) => {
		this.setState({
			currentImage: index
		});
	};

	render() {
		console.log(this.props, 'proos');
		const { pageContext: { data } } = this.props;
		const { openPreview, currentImage } = this.state;

		const images =
			data.portfolioImages &&
			data.portfolioImages.map((project, index) => {
				return {
					src: project.image.asset.url,
					caption: <Caption caption={project.title && project.title} url={project.image.asset.url} />
				};
			});

		const portfolioDescription =
			typeof window !== 'undefined' && window.localStorage.getItem('portfolioDescription');

		return (
			<Layout>
				<SEO
					title={`${data.title}`}
					description={`Boston Interior and Boston Interiors.quincy market. We have interior design ideas, we went to interior design schools ,we create interior design styles , interior design software, we provide interior design jobs, interior design Boston,interior designer boston,Boston Interior and Boston Interiors at Boston Logan airport. Here it shows about ${data.title}.`}
				/>
				<Helmet>
		          <link rel="canonical" href={`/portfolio/${data.slug.current}`} />
		        </Helmet>
				<div className="nav-avoider" />
				<h1 className="portfolio-title heading">{data.title}</h1>
				<div className="grid" onClick={this.showPreview}>
					{data.portfolioImages &&
						data.portfolioImages.map((project, index) => {
							return (
								<div
									// className="flex-row-item"
									key={project.id}
									onClick={() => {
										this.gotoImage(index);
									}}
								>
									<img
										src={project.image.asset.url}
										// className="flex-row-images"
										alt={`"${project.title && project.title}"`}
										id="check"
										title="project"
									/>
									{/* <div className="social-media-container">
										<SocialMedia />
									</div> */}
								</div>
							);
						})}
				</div>
				<Lightbox
					images={images}
					currentImage={currentImage}
					isOpen={openPreview}
					onClickPrev={this.gotoPrevious}
					onClickNext={this.gotoNext}
					onClose={this.closeLightbox}
					showThumbnails={true}
					onClickThumbnail={this.gotoImage}
					showImageCount={false}
					theme={theme}
				/>

				<div class="portfolio-description">
					<p>{portfolioDescription}</p>
				</div>
			</Layout>
		);
	}
}

export default ViewProject;
