import React from 'react';
import './carousel.css';

export default class Carousel extends React.Component {
	constructor() {
		super();

		this.state = {
			showPic: 1,
			picLimit: 0
		};

		// I have added a change here...

		this.changePic = this.changePic.bind(this);
		this.interval = '';
	}

	componentDidMount() {
		this.setState({ picLimit: this.props.images.length });
		this.interval = setInterval(
			() => this.changePic('autoNext'),
			this.props.carouselTime ? this.props.carouselTime : 10000
		);
	}

	changePic(motion, picLimit = this.state.picLimit) {
		if (motion === 'next' || motion === 'autoNext') {
			this.setState((prevState, props) => {
				if (prevState.showPic >= picLimit) {
					return { showPic: 1 };
				}

				return { showPic: prevState.showPic + 1 };
			});
		} else if (motion === 'back') {
			this.setState((prevState, props) => {
				if (prevState.showPic <= 1) {
					return { showPic: picLimit };
				}
				return { showPic: prevState.showPic - 1 };
			});
		}

		if (motion !== 'autoNext') {
			clearInterval(this.interval);
			this.interval = setInterval(
				() => this.changePic('next'),
				this.props.carouselTime ? this.props.carouselTime : 10000
			);
		}
	}

	render() {
		// console.log('\n\nasdasd\n\n', this.state.showPic, this.state.picLimit);

		const { images } = this.props;

		return (
			<div
				className="carousel"
				style={{
					height: this.props.carouselHeight ? this.props.carouselHeight : '',
					...this.props.styleCarousel
				}}
			>
				{this.props.displayFunction(images, this.state.showPic)}

				{this.props.removeLeftArrow ? (
					''
				) : (
					<div id="leftButton" onClick={() => this.changePic('back')}>
						<div id="leftButton__stick1" />

						<div id="leftButton__stick2" />
					</div>
				)}

				{this.props.removeRightArrow ? (
					''
				) : (
					<div id="rightButton" onClick={() => this.changePic('next')}>
						<div id="rightButton__stick1" />

						<div id="rightButton__stick2" />
					</div>
				)}

				{this.props.carouselOverlay ? <div id="carousel-overlay" /> : null}

				{this.props.children && this.props.children(this.state, this.props)}
			</div>
		);
	}
}
