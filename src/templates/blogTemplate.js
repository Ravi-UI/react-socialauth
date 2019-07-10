import React from 'react';
import PortableText from '@sanity/block-content-to-react';
import imageUrlBuilder from '@sanity/image-url';
import { Link } from "gatsby";
import { map, filter, isEmpty } from "lodash";
// import { graphql } from 'gatsby';
import myConfiguredSanityClient from '../utils/sanityConfig';
import Layout from '../components/layout';
import CommentList from '../components/commentList';
import SEO from '../components/seo';
import Helmet from 'react-helmet';
import '../utils/css/blogs.css';

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

// import "../utils/css/portfolio.css"

const builder = imageUrlBuilder(myConfiguredSanityClient);

function urlFor(source) {
	return builder.image(source);
}
function SocialMedia({ url }) {
	return (
		<div className="social-media-pics-holder">
			<FacebookShareButton
				quote={url}
				className="social-media-pic"
				hashtag="#whitlockdesigns"
				url="https://www.whitlockdesigns.com"
			>
				<FacebookIcon size={60} round className="social-media-pic" />
			</FacebookShareButton>
			<TwitterShareButton
				title={url}
				// via="https://my-facebook-link.com"
				hashtags={[ 'whitlockdesigns', 'architecture' ]}
				className="social-media-pic"
				url="https://www.whitlockdesigns.com"
			>
				<TwitterIcon size={60} round className="social-media-pic" />
			</TwitterShareButton>
		</div>
	);
}

const dateConvertion = (date) => {
	const dateString = new Date(date).toString();
	return dateString.substring(0, 15);
};

const serializers = {
	types: {
		block(props) {
			switch (props.node.style) {
				case 'h1':
					return <h1 className={''}>{props.children}</h1>;

				case 'h2':
					return <h2 className={''}>{props.children}</h2>;

				case 'h3':
					return <h3 className={''}>{props.children}</h3>;

				case 'h4':
					return <h4 className={''}>{props.children}</h4>;

				case 'blockquote':
					return <blockquote className={''}>{props.children}</blockquote>;

				case 'image':

				default:
					return <p className={'blogContent '}>{props.children}</p>;
			}
		},
		image(props) {
			return <img src={props.node.asset.url} className="blog-pic" alt="blog_pic" title="blog pic" />;
		}
	}
};

export default class Blog extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	blog_name:'',
	  	blog_email:'',
	  	blog_comment:'',
	  	isError: false,
	  	isSuccess: false
	  };
	}
	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}
	resetValue = () => {
		this.setState({
		  	blog_name:'',
		  	blog_email:'',
		  	blog_comment:''
		})
	}
	clearMessage = () => {
		setTimeout(() => {
			this.setState({
				isError: false,
	  			isSuccess: false
			});
		}, 4000);
	}
	postComments = (e, postId, data) => {
		e.preventDefault();
		const doc = {
		  _type: 'comment',
		  firstName: data.blog_name,
		  commentedBy: data.blog_email,
		  comment: data.blog_comment,
		  publish: "NO",
		  postId:postId
		}

		myConfiguredSanityClient.create(doc).then(res => {
			this.setState({
				isSuccess: true
			})
			this.clearMessage();
			this.resetValue();
		}, err => {
			this.setState({
				isError: true
			})
			this.clearMessage();
		})
	}
	render(){
		const data = this.props.pageContext.data;
		const postList = this.props.pageContext.postList;
		const commentList = this.props.pageContext.comments;
		const categoriesList = this.props.pageContext.categories;
		let pageTitle = data.title.split(':')[1]==="undefined" ? data.title.split(':')[1] : data.title;
		pageTitle = pageTitle && pageTitle.split('').length > 15 ? pageTitle.split('').slice(0, 15).join('') : pageTitle;
		// console.log(props, '\n\n\nDATA\n\n\n');
		const currentPostComments = filter(commentList, el =>  el.node.publish.toUpperCase()==="YES" && el.node.postId===data.id);

		return (
			<Layout>
				<Helmet>
		          <link rel="canonical" href={`/blogs/${data.slug.current}`} />
		        </Helmet>
				<SEO
					title={pageTitle}
					description={`WHITLOCK DESIGN GROUP, boston architecture firms, interior designer boston, restaurant designer boston commercial, WHITLOCK DESIGN GROUP. interior design firms boston, affordable interior design boston. ${data.title} ${Math.random()}`}
				/>
				{this.state.isSuccess && <div className="global">Successfuly posted your comments, it will reflect once reviewed by Owner</div>}
				{this.state.isError && <div className="global error">Please post your comments after some time.</div>}
				<div className="nav-avoider" />
				<div className="row-container">
					<div className="container">
						<div className="card-blog-single-view">
							<div className="blog-row">
								<div className="blog-detail">
									<h1 className="blogTitleMain">{data.title}</h1>
									<h5 className="category">category : {map(data.categories, (el, idx) => <Link to={`/blogs?category=${el.title}`}>{el.title}{idx!==data.categories.length-1 && ', '}</Link>)}</h5>
									<h5>{dateConvertion(data.publishedAt)}</h5>
									<div className="blog-detail-card">
										<img src={data.mainImage.asset.url} alt={data.mainImage.asset.id} title="full img" />
										<PortableText blocks={data.body} serializers={serializers} />
									</div>
									<div className="social-media-holder">
						              <h3>Share</h3>
						              <SocialMedia
						                url={typeof window !== "undefined" ? window.location.href : ""}
						              />
						            </div> 
						            <h3 class="commentTitle">Comments</h3>
						            <CommentList data={currentPostComments} />
									<h3 className="commentTitle">Leave a comment</h3>
									<form method="post" className="comment-form">
										<textarea
											id="blog_comment"
											rows="4"
											cols="60"
											value={this.state.blog_comment}
											className="commentInputArea"
											placeholder="Your message here..."
											onChange={(e) => this.handleChange(e)}
										/>
										<p class="comment-form-author">
											<input
												id="blog_email"
												className="commentInput"
												name="blog_email"
												type="text"
												size="30"
												tabindex="1"
												aria-required="true"
												required
												value={this.state.blog_email}
												onChange={(e) => this.handleChange(e)}
												placeholder="Enter your email address"
											/>
										</p>
										<p class="comment-form-author">
											<input
												id="blog_name"
												className="commentInput"
												name="blog_name"
												type="text"
												size="30"
												tabindex="1"
												aria-required="true"
												required
												value={this.state.blog_name}
												onChange={(e) => this.handleChange(e)}
												placeholder="Enter your name"
											/>
										</p>
										<button className="btn" onClick={(e) => this.postComments(e, data.id, this.state)}>Post Comment</button>
									</form>
								</div>
								<div className="blog-nav">
									<h3>Related Posts</h3>
									<div className="related-blogs">
										{postList.map((el, index) => index <= 3 && el.node.id !== data.id && <Link to={`/blogs/${el.node.slug.current}`} className="related-blogs-card" key={index}>
												<img src={el.node.mainImage.asset.url} alt={el.node.slug.current} title={el.node.slug.current} className="related-blogs-image"/>
												<div className="related-blogs-text">
													<h4>{el.node.title.toLowerCase()}</h4>
													{el.node.author!==null && <h4>{el.node.author.name}</h4>}
												</div>
											</Link>)}
									</div>
									<h3>Categories</h3>
									<div className="tags">
										{categoriesList.map((el, index) => <Link to={`/blogs?category=${el.node.title}`}><span key={index}>{el.node.title.toLowerCase()}</span></Link>)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
}
