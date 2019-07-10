import React, { Component } from 'react';

import Layout from '../components/layout';
import Helmet from 'react-helmet';
import SEO from '../components/seo';
import '../utils/css/fileroom.css';
import TextBox from '../components/FormElements/textBox';
import LightBox from '../components/lightBox';
import footerLogo from '../images/footer_logo.png';
import { isEmpty, map, filter } from 'lodash';
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: '',
      rootFolder:[],
      isShowPopup:false,
      folderName:''
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  folderCreate = (e) => {
  	e.preventDefault();
  	const { rootFolder, folderName } = this.state;
  	const folderNameObj = [{folderName: folderName, filesArray:[]}];
  	this.setState((prevState, props) => {
	  return {
	  	rootFolder: prevState.rootFolder.concat(folderNameObj),
	  	currentFolderName: folderName,
	  	folderName:"" 
	  };
	})
  	this.togglePopup(e);
  }
  formatBytes(bytes, decimals) {
	    if (bytes === 0) return '0 Bytes';

	    const k = 1000;
	    const dm = decimals < 0 ? 0 : decimals;
	    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	    const i = Math.floor(Math.log(bytes) / Math.log(k));

	    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	}
	getDate = () => {
		const today = new Date();
		const date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
		const time = today.getHours() + ":" + today.getMinutes();
		return date+' '+time;
	}
  togglePopup = (e) => {
  	e.preventDefault();
  	this.setState({
  		isShowPopup: !this.state.isShowPopup,
  		folderName:"" 
  	})
  }
  openFolder = (folderName) => {
  	const { rootFolder } = this.state;
  	const currentFolder = filter(rootFolder, el => el.folderName===folderName);
  	this.setState({
  		currentFolder,
  		currentFolderName:folderName
  	})
  }
	myfiledownload(url){
	    window.location.href = "/url/to/downloadfile/"
	}
  fileHandler = (e) => {
  		const { rootFolder, currentFolderName } = this.state;
      const file = e.target.files[0];
      // var name = file.name;
      	const self = this;
      	console.log(file);
	    var reader = new FileReader();
	    reader.onload = function(){
	      var dataURL = reader.result;
	      const fileObjArray = filter(rootFolder, el => el.folderName===currentFolderName)[0].filesArray;
	      fileObjArray.push({file: dataURL, name: file.name, size: self.formatBytes(file.size, 2), date: self.getDate(), type: file.type});
	      map(rootFolder, el => {
	      	if(el.folderName===currentFolderName){
	      		el.filesArray = fileObjArray
	      	}
	      })
	      self.setState({
	      	rootFolder
	      }, () => {
	      	console.log(rootFolder);
	      })
	    };
	    reader.readAsDataURL(file);
  }
  render() {
    const { searchKey, folderName, isShowPopup, rootFolder, currentFolder, currentFolderName } = this.state;
    console.log(rootFolder);
    return (
      <div style={{backgroundColor: '#606e7d'}}>
        <Helmet>
            <link rel="canonical" href="/dashboard" />
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
        </Helmet>
        <SEO
            title={`Dashboard`}
            description={`This page describes about our cloud storage. ${Math.random()}`}
        />
       	<header>
       		<div className="container-sub">
       			<div className="row">
       				<div className="col-2">
       					<div className="whit-logo">
							<img
								src={footerLogo}
								height="auto"
								width="auto"
								alt="footer_logo"
								title="footer_logo"
							/>
						</div>
       				</div>
	       			<div className="col-8">
	       				<form className="form-inline search">
						    <input className="form-control mr-sm-2" type="text" placeholder="Search" onChange={this.handleChange} name="searchKey" value={searchKey}/>
						    <button className="btn btn-success" type="submit">Search</button>
						</form>
	       			</div>
	       			<div className="col-2">
		       			<div className="user-profile">
		       				<h6>Welcome, Ravi kumar</h6>
		       			</div>
		       		</div>
	       		</div>
       		</div>
       	</header>
       	<div className="dashboard">
       		<div className="container-sub">
	       		<div className="row justify-content-center">
			       	<div className="top-nav col-8">
			       		<ul>
			       			<li>Welcome to File Room</li>
			       		</ul>
			       	</div>
			    </div>
			</div>
		       	<div className="nav-container">
			       	<div className="left-nav">
			       		<h6 onClick={this.togglePopup}>Create folder</h6>
			       		<ul>
			       		{!isEmpty(rootFolder) && map(rootFolder, el => {
			       			return <li onClick={() => this.openFolder(el.folderName)}>{el.folderName}</li>
			       		})}
			       		</ul>
			       	</div>
			       	<div className="right-nav">
			       		<h6><input 
			       				id="myInput" 
			       				type="file"
			       				ref={(ref) => this.upload = ref}
			       				onChange={this.fileHandler}
			       				style={{ display: 'none' }} />
		       				<span onClick={(e) => this.upload.click() }>Upload file</span>
			       		</h6>
			       		<h6>{currentFolderName}</h6>
			       		{(!isEmpty(currentFolder) && !isEmpty(currentFolder[0].filesArray)) && <table className="table  table-hover">
						  <thead>
						    <tr>
						      <th scope="col">File Name</th>
						      <th scope="col">Size</th>
						      <th scope="col">Created</th>
						      <th scope="col">File Type</th>
						    </tr>
						  </thead>
						  <tbody>
						    {map(currentFolder[0].filesArray, el => {
						   return <tr>
						      <td>{el.name}</td>
						      <td>{el.size}</td>
						      <td>{el.date}</td>
						      <td>{el.type}</td>
						    </tr> })} 
						  </tbody>
						</table>}
			       	</div>
			    </div>
       	</div>
       	<LightBox isShowPopup={isShowPopup} togglePopup={this.togglePopup} title="Create Folder">
       		<form onSubmit={this.folderCreate}>
       			<input name="folderName" value={folderName} placeholder="Enter your folder name" onChange={this.handleChange}/>
       			<div className="button-row">
       				<button onClick={this.togglePopup}>Cancel</button>
       				<button onClick={this.folderCreate}>Create</button>
       			</div>
       		</form>
       	</LightBox>
      </div>
    );
  }
}

export default Dashboard;