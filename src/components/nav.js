import React from "react"
import { Link } from "gatsby"

import "./nav.css"

import logo from "../images/logo_1.png"

export default class Nav extends React.Component {
  constructor() {
    super()

    this.state = {
      hamburgerActive: false,
      transparentNavbar: true,
    }

    this.hamburgerOnClick = this.hamburgerOnClick.bind(this)
  }

  componentDidMount() {
    document.addEventListener("scroll", d => {
      if (window.scrollY > 50 && this.state.transparentNavbar) {
        this.setState(() => {
          return {
            transparentNavbar: false,
          }
        })
      } else if (window.scrollY <= 50 && !this.state.transparentNavbar) {
        this.setState(() => {
          return {
            transparentNavbar: true,
          }
        })
      }
    })
  }

  hamburgerOnClick = () => {
    this.setState((prevState, prevProps) => {
      return { hamburgerActive: !prevState.hamburgerActive }
    })
  }

  render() {
    return (
      <nav
        id="nav"
        className={
          (this.state.hamburgerActive ? "hamburger-cross-nav " : "") +
          (this.state.transparentNavbar ? "transparent-navbar" : "")
        }
      >
        <Link
          id="nav-logo"
          to={"#"}
          className={
            this.state.transparentNavbar
              ? "logo"
              : this.state.hamburgerActive
              ? "logo2"
              : "logo1"
          }
        >
          <img
            src={logo}
            height={this.state.transparentNavbar ? "250" : "150"}
            width="auto"
            alt="whitlock_design_group"
            title="witlock_design_group"
          />
        </Link>
        <ul
          id="nav-items"
          className={this.state.hamburgerActive ? "hamburger-cross-nav" : ""}
          style={{
            marginTop:
              this.state.transparentNavbar && this.state.hamburgerActive
                ? "7rem"
                : this.state.hamburgerActive
                ? "4.4rem"
                : "",
          }}
        >
          <Link to={"/"}>
            <li className="nav-item">Home</li>
          </Link>
          <Link to={"/portfolio"}>
            <li className="nav-item">Portfolio</li>
          </Link>
          <Link to={"/about-us"}>
            <li className="nav-item">About</li>
          </Link>
          <Link to={"/awards"}>
            <li className="nav-item">Awards</li>
          </Link>
          <Link to={"/blogs"}>
            <li className="nav-item">Blog</li>
          </Link>
          <Link to={"#footer"}>
            <li className="nav-item">Contact Us</li>
          </Link>
        </ul>
        <div id="hamburger" onClick={this.hamburgerOnClick}>
          <div
            className={
              this.state.hamburgerActive
                ? "hamburger-line hamburger-cross"
                : "hamburger-line"
            }
          />
          <div
            className={
              this.state.hamburgerActive
                ? "hamburger-line hamburger-cross"
                : "hamburger-line"
            }
          />
          <div
            className={
              this.state.hamburgerActive
                ? "hamburger-line hamburger-cross"
                : "hamburger-line"
            }
          />
        </div>
      </nav>
    )
  }
}
