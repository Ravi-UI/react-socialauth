import React from 'react';
import './WhoWeAre.css';

import { Link } from "gatsby";

export default class WhoWeAre extends React.Component {
  render() {
    return (
      <div id="self-praise">
        <div id="self-praise__content-wrapper"></div>
        <div className="self-praise__child">
          <h2 className="self-praise__title">Who we are</h2>
        </div>

        <p id="self-praise__para">
          Whitlock Design Group is a leader in restaurant and hospitality design with an extensive portfolio of dynamic and innovative retail, restaurant and entertainment venues. Whitlock Design Group has created award-winning designs and has been published in magazines, newspapers, television programs and across the web and social media.
        </p>
        <Link to="/about-us/" className="link"><button className="btn">Read more </button></Link>
      </div>
    )
  }
}