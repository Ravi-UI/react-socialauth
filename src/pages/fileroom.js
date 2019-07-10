import React, { Component } from 'react';
import { navigateTo } from 'gatsby-link';
import Layout from '../components/layout';
import Helmet from 'react-helmet';
import SEO from '../components/seo';
import '../utils/css/fileroom.css';
import TextBox from '../components/FormElements/textBox';
class FileRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password:''
    };
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSubmit = (e) => {
    e.preventDefault();
    const { userName, password } = this.state;
    if(userName!=='' && password!==''){
      navigateTo('/dashboard');
    }
  }
  render() {
    const { userName, password } = this.state;
    return (
      <div style={{backgroundColor: '#606e7d'}}>

        <Helmet>
            <link rel="canonical" href="/fileroom" />
        </Helmet>
        <SEO
            title={`File Room`}
            description={`This page describes about our cloud storage. ${Math.random()}`}
        />
        <div className="file-room-wrapper">
            <div className="login">
                <div className="form">
                    <TextBox 
                        name={'userName'}
                        value={userName}
                        onChange={this.onChange}
                        placeholder={'Enter your email'}
                        label={'Email'}
                        type={'email'}
                    />
                    <TextBox 
                        name={'password'}
                        value={password}
                        onChange={this.onChange}
                        placeholder={'Enter your password'}
                        label={'Password'}
                        type={'password'}
                    />
                    <div className="button-row d-flex d-vh-center pt-20">
                        <button className="primary-button" onClick={(e) => this.onSubmit(e)}>Login</button>
                        <button className="link-button">Forgot password?</button>
                    </div>
                    {/*<div className="button-row d-flex d-vh-center pt-20">
                        <button className="link-button">Sign up</button>
                        <button className="link-button">Signup with Google</button>
                    </div>*/}
                </div>
            </div>
      	</div>
      </div>
    );
  }
}

export default FileRoom;