import React from 'react';
// import Instafeed from "instafeed.js";
import '../utils/css/footer.css';
import '../components/purecss.css';
import { Link } from "gatsby"
import facebook from '../images/facebook.png';
import insta from '../images/insta.png';
import twitter from '../images/twitter.png';
import footerLogo from '../images/footer_logo.png';
import pinterest from '../images/pinterest.png';
import linkedin from '../images/linkedin.png';
import FileRoom from '../images/file_room.png';
import Axios from 'axios';

export default class Footer extends React.Component {
	constructor() {
		super();

		this.state = {
			instaPics: [],
			isLoading:false,
			isSubscribed:false,
			isError:false
		};
		this.inputText = React.createRef();
	}

	componentDidMount = () => {
		Axios.get(
			'https://api.instagram.com/v1/users/self/media/recent/?access_token=2004806463.51195a8.8a8b0d852e654198833c69ff7bca1755&count=3'
		).then((result) => {
			console.log(result, 'wow!');
			let instaPics = [];
			result.data.data.map((image) => {
				instaPics.push(image.images.low_resolution.url);
			});
			console.log(instaPics, 'instaPics');

			this.setState({
				instaPics: instaPics
			});
		});
	};

	handleSubscribe(){
		this.setState({
			isLoading: true
		})
		const self = this;
		if(this.inputText.current.value!==''){
			const data = {
				email_address: this.inputText.current.value,
				status:"subscribed",
				merge_fields: {
	        		FNAME: this.inputText.current.value.split('@')[0]
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
		        if(e.status===400){
			        self.setState({
			        	isSubscribed: false,
			        	isError: true,
			        	isLoading: false
			        })
		        }else{
		        	self.inputText.current.value=''
			        self.setState({
			        	isSubscribed: true,
			        	isError: false,
			        })
		        }
		        self.resetMessage();
		    }).catch(function(e){
		        self.setState({
		        	isSubscribed: false,
		        	isError: true,
		        	isLoading: false
		        })
		        self.resetMessage();
		    })
		}
	}
	resetMessage = () => {
		setTimeout(() => {
		  	this.setState({
	        	isSubscribed: false,
	        	isError: false,
	        	isLoading: false
		 	})
		}, 4000);
	}
	render() {
		const { isLoading, isError, isSubscribed } = this.state;
		return (
			<div className="footer-wrapper">
				<div id="footer-logo-wrapper">
					<img
						src={footerLogo}
						height="auto"
						width="auto"
						alt="footer_logo"
						id="footer-logo-main"
						title="footer_logo"
					/>
				</div>

				<div id="footer" ref="footer">
					<div id="footer__logo">
						<div id="contact__details">
							<div className="footer-contact-details">
								<p className="contact-details-link company-name">WHITLOCK DESIGN GROUP</p>
								<p className="contact-details-link">Bill Whitlock</p>
								<a
									className="contact-details-link"
									target="_blank"
									href="https://www.google.com/maps/place/681+Main+St+Suite+3%2F31,+Waltham,+MA+02451,+USA/@42.3763935,-71.2394601,17z/data=!3m1!4b1!4m5!3m4!1s0x89e382d659f7eca1:0x6e55b0a85c7b91d2!8m2!3d42.3763935!4d-71.2372714"
								>
									681 Main Street,
								</a>
								<a
									className="contact-details-link"
									href="https://www.google.com/maps/place/681+Main+St+Suite+3%2F31,+Waltham,+MA+02451,+USA/@42.3763935,-71.2394601,17z/data=!3m1!4b1!4m5!3m4!1s0x89e382d659f7eca1:0x6e55b0a85c7b91d2!8m2!3d42.3763935!4d-71.2372714"
									target="_blank"
								>
									Suite 3-31,
									<p>Waltham, MA 02451.</p>
								</a>
								<a href="tel:+17816478008" className="contact-details-link">
									Tel: (781) 647-8008
								</a>
								<p>Email: bwhitlock@whitlockdesigns.com</p>
								<Link to="/fileroom" className="file-room">
									<img
										src={FileRoom}
										alt="FileRoom"
										title="file-room"
									/>
								</Link>
							</div>
						</div>
					</div>

					<form
						id="footer__form"
						className="pure-form"
						name="whitlock-contact-us"
						action="https://formspree.io/bwhitlock@whitlockdesigns.com"
						method="post"
					>
						<h3 className="contact-details-heading">QUICK CONTACT</h3>
						<fieldset>
							<div className="footer__form__divider">
								<input
									type="text"
									name="name"
									placeholder="Your name"
									className="footer__form__input"
									required
								/>
								<input type="email" name="email" placeholder="Email" className="footer__form__input" />
							</div>

							<div className="footer__form__divider">
								<input
									type="tel"
									name="number"
									placeholder="Phone(optional)"
									className="footer__form__input"
								/>
								<input
									type="text"
									name="company"
									placeholder="Company name(optional)"
									className="footer__form__input"
								/>
							</div>

							<textarea
								rows="4"
								cols="50"
								name="message"
								className="footer__form__input"
								placeholder="Send a note or give us a call. We’d love to hear from you!"
							/>
						</fieldset>
						<button className="send-button">Send</button>
					</form>
					<div className="insta_grid_container">
						{/* <div className="insta_images_container" id="instafeed"> */}
						<h3 className="insta_label_name"> Instagram Feed</h3>
						<div id="insta_pics">
							{this.state.instaPics &&
								this.state.instaPics.map((value, index) => {
									return (
										// <div id="square" key={index}>
										// 	<div id="content">
										// 		<div id="table">
										// 			<div id="table-cell">
										<img id="insta-pic" src={value} alt="whitlock_design_group_Restaurant_Designer" title="ista_pic" />
										// 			</div>
										// 		</div>
										// 	</div>
										// </div>
									);
								})}
						</div>
						<div id="social_links">
							<h5 className="follow-us">FOLLOW US</h5>
							<div className="social_links_wrapper">
								<a
									href="https://www.facebook.com/pages/category/Interior-Design-Studio/Whitlock-Design-Group-328624127171838/"
									target="_blank"
								>
									<img
										src={facebook}
										alt="Medford_Restaurant_Architect"
										className="social-img"
										title="facebook_pic"
									/>
								</a>
								<a href="https://www.instagram.com/whitlock_design_group/?hl=en" target="_blank">
									<img
										src={insta}
										alt="Boston_Restaurant_Designer"
										className="social-img instagram-pic"
										title="insta_pic"
									/>
								</a>
								<a href="https://twitter.com/WhitlockArch" target="_blank">
									<img src={twitter} alt="Boston_Restaurant_Designer" className="social-img" title="twitter_pic" />
								</a>
								<a href="https://in.pinterest.com/whitlockdesigngroup/" target="_blank">
									<img
										src={pinterest}
										alt="Somerville_massachusetts_Designer"
										className="social-img"
										title="pinterest_pic"
									/>
								</a>
								<a href="https://www.linkedin.com/company/whitlock-architects/about/" target="_blank">
									<img
										src={linkedin}
										alt="Cambridge_Interior_Designer"
										className="social-img linkedin"
										title="linkedin pic"
									/>
								</a>
							</div>
						</div>

						<h3 className="insta_label_name">Subscribe Us</h3>
						<div className="footer__form__divider subscribe">
							<input
									type="text"
									name="Subscribe"
									placeholder="Enter your email address"
									className="footer__form__input"
									ref={this.inputText}
								/>
							<button className="send-button" onClick={this.handleSubscribe.bind(this)} disabled={isLoading}>Submit</button>
							{!isError && isSubscribed && <div className="error-message success">Thanks for subscribing</div>}
							{isError && <div className="error-message">Please check your email.</div>}
						</div>
					</div>
					{/* </div> */}
				</div>
				<div className="copyrights_madeby_container">
					<p className="footer-text">
						Copyrights &copy; {new Date().getFullYear()} whitlock Design Group. All rights reserved.
					</p>
					<a href="https://sataiva.com/" target="_blank" className="footer-text1"> Made with &hearts; by Sataiva Technologies.</a>
				</div>
			</div>
		);
	}
}
