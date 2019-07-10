/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header';
import './layout.css';
import Footer from './Footer';

import Nav from './nav';
import scrollUpBtn from './ScrollUpBtn';

function scrollUp() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
}

export default class Layout extends React.Component {
	constructor() {
		super();

		this.state = {
			// isPageLoading: true,
			scrollUpBtn: false
		};
	}

	componentDidMount() {
		setTimeout(
			() =>
				this.setState({
					isPageLoading: false
				}),
			1200
		);

		document.addEventListener('scroll', (d) => {
			if (window.scrollY < 250 && this.state.scrollUpBtn) {
				this.setState(() => {
					return {
						scrollUpBtn: false
					};
				});
			} else if (window.scrollY >= 250 && !this.state.scrollUpBtn) {
				this.setState(() => {
					return {
						scrollUpBtn: true
					};
				});
			}
		});
	}

	render() {
		// return this.state.isPageLoading ? (
		// 	<div className="show-loader">
		// 		{/* <h2 className="loader-text">Loading</h2> */}
		// 		<div className="loader"></div>
		// 		<h3 className="loader-inner">W</h3>
		// 	</div>
		// ) : (
		return (
			<StaticQuery
				query={graphql`
					query SiteTitleQuery {
						site {
							siteMetadata {
								title
							}
						}
					}
				`}
				render={(data) => (
					<div className="layout-wrapper">
						<Nav />
						{this.props.children}
						{this.state.scrollUpBtn ? scrollUpBtn(scrollUp) : null}
						<Footer />
					</div>
				)}
			/>
		);
		// );
	}
}

Layout.propTypes = {
	children: PropTypes.node.isRequired
};
