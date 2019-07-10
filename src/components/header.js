import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import '../utils/css/header.css';

const Header = ({ siteTitle }) => (
  <header
    className="header-wrapper"
  >
    <div
      className="header"
    >
      <h1 className="header-title">
        <Link
          to="/"
          className="header-link"
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
