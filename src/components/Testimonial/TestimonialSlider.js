import React from 'react';
import './testimonialSlider.css';

const applyClassName = (testimonialOrderNumber, testimonialToShow, totalTestimonialLength, firstLoad) => {
	// if(testimonialToShow === totalTestimonialLength - 1 && testimonialOrderNumber === )
	// if ((testimonialToShow === 0) && (testimonialOrderNumber === totalTestimonialLength - 2)) {
	//   return 'go-up-and-beyond';
	// }

	if (testimonialToShow === 0 && !firstLoad && testimonialOrderNumber === totalTestimonialLength - 1) {
		return 'go-up-and-beyond';
	}

	if (testimonialToShow === testimonialOrderNumber) {
		return 'let-me-see-you';
	} else if (testimonialToShow === testimonialOrderNumber + 1) {
		return 'go-up-and-beyond';
	}

	return '';
};

export default class TestimonialSlider extends React.Component {
	constructor() {
		super();

		this.state = {
			currentView: 0,
			firstLoad: true
		};

		this.changeTestimonialInterval = '';
	}

	componentDidMount() {
		this.changeTestimonialInterval = setInterval(() => {
			this.setState((state, props) => {
				console.log(state.currentView, props.testimonials.length);
				return {
					currentView: state.currentView < props.testimonials.length - 1 ? state.currentView + 1 : 0,
					firstLoad: false
				};
			});
		}, this.props.slideWaitTime);
	}

	componentWillUnmount() {
		clearInterval(this.changeTestimonialInterval);
	}

	render() {
		return (
			<div id="testimonials-wrapper">
				{this.props.testimonials.map((testimonial, i) => {
					return (
						<div
							className={`testimonial-wrapper ${applyClassName(
								i,
								this.state.currentView,
								this.props.testimonials.length,
								this.state.firstLoad
							)}`}
							key={i}
						>
							<div className="heading-portion">
								<p className="heading-portion__quote">"</p>
							</div>
							<p className="text-portion" style={this.props.testimonialStyle.testimonialText}>
								{testimonial.text}
							</p>
							<p className="ending-portion" style={this.props.testimonialStyle.testimonialAuthorName}>
								- {testimonial.authorName}
							</p>
						</div>
					);
				})}
			</div>
		);
	}
}
