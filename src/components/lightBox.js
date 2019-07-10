/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import './lightBox.css';
export default class LightBox extends React.Component {
	constructor() {
		super();
	}

	componentDidMount() {
		
	}

	render() {
		const { isShowPopup, title } = this.props;
		return (<div className={["lightbox-wrapper",isShowPopup ? "show" : ""].join(' ')}>
				<div className="lightbox-inner">
					<h6>{title}</h6>
					<button type="button" className="close" aria-label="Close" onClick={this.props.togglePopup}>
					  <span aria-hidden="true">&times;</span>
					</button>
					{this.props.children}
				</div>
			</div>
		);
	}
}

LightBox.propTypes = {
	children: PropTypes.node.isRequired
};
