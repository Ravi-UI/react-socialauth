import React from 'react';
import { Link } from 'gatsby';
import { graphql } from 'gatsby';
import { uniqBy, filter, map, isEmpty } from 'lodash';
import Layout from '../components/layout';
import SEO from '../components/seo';

import image1 from '../images/blog/blog1.jpg';
import image2 from '../images/blog/blog2.jpg';
import image3 from '../images/blog/blog3.jpg';
import image4 from '../images/blog/blog4.jpg';

import Helmet from 'react-helmet';

import '../utils/css/blogs.css';
const dateConvertion = (date) => {
	const dateString = new Date(date).toString();
	return dateString.substring(0, 15);
};

class Blog extends React.Component {
	constructor(props) {
	    super(props);
	    // create a ref to store the textInput DOM element
	    this.state = {
	    	isSubscribed: false,
	    	isLoading: false,
	    	isError: false,
	    	allPost:[],
	    }
	    this.inputRef = React.createRef();
	  }
	  componentDidMount() {
	  	const queryParam = decodeURI(this.props.location.search.split('=')[1]);
	  	if(queryParam!=='undefined'){
	  		this.filterPost(queryParam);
	  	}else{
		    this.setState({
		    	allPost: this.props.data.allSanityPost.edges
		    })
	  	}
	  }
	  componentWillReceiveProps(nextProps) {
	  	if(this.props.location.search!==nextProps.location.search){
	  		const queryParam = decodeURI(nextProps.location.search.split('=')[1]);
	  		if(queryParam!=='undefined'){
	  			this.filterPost(queryParam);
	  		}else{
	  			this.setState({
			    	allPost: this.props.data.allSanityPost.edges
			    })
	  		}
	  	}
	  }
	  filterPost = (queryParam) => {
	  	console.log(queryParam);
  		const newData = []; 
  		filter(this.props.data.allSanityPost.edges, (el, i) => {
  			map(el.node.categories, elm => {
  				if(elm.title.indexOf(queryParam)!==-1){
  					newData.push(el);
  				}
  			})
  			if(i===this.props.data.allSanityPost.edges.length-1){
  				this.setState({
  					allPost: newData
  				})
  			}
  		});
	  }
	handleSubscribe(){
		this.setState({
			isLoading: true
		})
		const self = this;
		if(this.inputRef.current.value!==''){
			const data = {
				email_address: this.inputRef.current.value,
				status:"subscribed",
				merge_fields: {
	        		FNAME: this.inputRef.current.value.split('@')[0]
	        	}
			};
			const proxyurl = "https://cors-anywhere.herokuapp.com/";
			const url = "https://us20.api.mailchimp.com/3.0/lists/d9523c42fa/members";
			fetch(proxyurl+url, {
		      crossDomain:true,
		      method: 'POST',
		      headers: {
		        'authorization': "Basic YXBpa2V5OjAyYmYxZDgzNTdhZjVmMzVmYjkwMDg5ZGFlMTE5ZDgxLXVzMjA=",
		        'Accept': 'application/json',
		        'Content-Type': 'application/json'
		      },
		      body: JSON.stringify(data)
		    }).then(function(e){
		        console.log(e)
		        console.log("fetch finished");
		        if(e.status===400){
			        self.setState({
			        	isSubscribed: false,
			        	isError: true,
			        	isLoading: false
			        })
		        }else{
			        self.setState({
			        	isSubscribed: true,
			        	isError: false,
			        })
		        }
		    }).catch(function(e){
		        console.log(e);
		        self.setState({
		        	isSubscribed: false,
		        	isError: true,
		        	isLoading: false
		        })
		    })
		}
	}
	renderCategory = (data) => {
		const category = map(data, el => el.title);
		return category.join();
	}
	render(){
		const { isSubscribed, isError, isLoading, allPost } = this.state;
		let categoriesList = [];
		this.props.data.allSanityPost.edges.map(el => el.node.categories.map(elm => {
			categoriesList.push(elm);
		}));
		categoriesList = uniqBy(categoriesList, 'id');
		return (
			<Layout>
				<Helmet>
					<link rel="canonical" href="/blogs" />
					<link
						rel="stylesheet"
						href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
						integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
						crossorigin="anonymous"
					/>
					<script src="https://cdn.wordart.com/wordart.min.js" async defer></script>
				</Helmet>
				<SEO title={`Blogs|Architect|Restaurant Designer|Boston,MA`} description={`Whitlock Design Group is a leader in restaurant and hospitality design with an extensive portfolio of dynamic and innovative retail, restaurant and entertainment venues.Trillium Boston Trillium Boston Trillium Boston Trillium Boston Trillium Boston Trillium Boston Trillium Boston Trillium Boston Trillium Boston Trillium Boston Trillium Boston Trillium Boston Trillium Boston Trillium Boston Trillium Boston Trillium BostonTrillium BostonTrillium`} />
				<div className="nav-avoider" />
				<section className="parallax-feature">
					<div className="blog-art" data-wordart-src="https://cdn.wordart.com/json/gszx1qu4nt0d"></div>
					<i className="fa fa-paper-plane" />
					<div className="feature">
						<h1 className="feature-title">SUBSCRIBE TO OUR NEWSLETTER</h1>
						<div className="feature-input">
							{!isSubscribed && <div id="subscribe">
								<input
									type="text"
									className="enteremail error"
									name="EMAIL"
									id="subscribe-email"
									placeholder="Enter your email address"
									spellCheck="false"
									ref={this.inputRef}
								/>
								<button type="submit" id="signup-button" className="signup-button" onClick={this.handleSubscribe.bind(this)} disabled={isLoading}>
									SUBMIT
								</button>
								<label htmlFor="subscribe-email" className="subscribe-message error">
									<i className="fa fa-warning" />
									<span className="message-content" />
								</label>
							</div>}
						</div>
						{!isSubscribed && isError && <div style={{color: 'red', textAlign:'center'}}>Please check your email address.</div>}
						{isSubscribed && !isError && <div style={{color: '#5582ac', textAlign:'center'}}>Thank you for Subscribing to Whitlock Design Group's Newsletter.</div>}
					</div>
				</section>
				<div className="row-container">
					<div className="container">
						<div className="blog-row">
							<div>
								{allPost.map((edge) => {
									return (
										<div className="card" key={edge.node.id}>
											<div
												className={'fakeimg'}
												style={{
													backgroundImage: `url(${edge.node.mainImage.asset.url})`
												}}
												// src={edge.node.mainImage.asset.url}
												// alt={edge.node.mainImage.asset.id}
												// alt="fake_img"
											/>
											<div className="blog-content-wrapper">
												<Link to={`/blogs/${edge.node.slug.current}`}>
													<h2 className="blogTitle">{edge.node.title}</h2>
												</Link>
												<h5 className="publishedDate">{dateConvertion(edge.node.publishedAt)}</h5>
												<h5 className="category">category : {map(edge.node.categories, (el, idx) => <Link to={`/blogs?category=${el.title}`}>{el.title}{idx!==edge.node.categories.length-1 && ', '}</Link>)}</h5>
												<p className="miniBlogText">
													{edge.node.body[0].children[0].text && edge.node.body[0].children[0].text}
												</p>
												<Link to={`/blogs/${edge.node.slug.current}`}>
													<p className="blog-read-more-btn">Read more &rarr;</p>
												</Link>
											</div>
										</div>
									);
								})}
							</div>
							<div className="blog-nav">
								<h3>Related Posts</h3>
								<div className="related-blogs">
									{this.props.data.allSanityPost.edges.map((el, index) => index <= 3 && <Link to={`/blogs/${el.node.slug.current}`} className="related-blogs-card" key={index}>
											<img src={el.node.mainImage.asset.url} alt={el.node.mainImage.asset.id} title="full img" className="related-blogs-image"/>
											<div className="related-blogs-text">
												<h4>{el.node.title.toLowerCase()}</h4>
												{el.node.author!==null && <h4>{el.node.author.name}</h4>}
											</div>
									</Link>)}
								</div>
								<h3>Categories</h3>
								<div className="tags">
									{categoriesList.map((elm, idx) => <Link to={`/blogs?category=${elm.title}`}><span>{elm.title.toLowerCase()}</span></Link>)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
}
export default Blog;
export const query = graphql`
	query allBlogPosts {
		allSanityPost(sort: { order: DESC, fields: publishedAt }, limit: 5) {
			edges {
				node {
					id
					title
					publishedAt
					categories {
			          title
			          id
			        }
			        author{
			        	name
			        }
					mainImage {
						asset {
							id
							url
						}
					}
					_createdAt
					slug {
						_type
						current
					}
					body {
						_key
						_type
						children {
							_key
							_type
							text
						}
						style
					}
				}
			}
		}
	}
`;
