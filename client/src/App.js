import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { geolocated } from "react-geolocated";
import axios from 'axios';

class App extends Component{
	constructor(props) {
    super(props);
    this.state = { 
    	apiResponse: "",
    	lat: 0,
    	long: 0,
     };
	}

	componentDidMount() {
		let currentComponent = this;
		navigator.geolocation.getCurrentPosition(
			function(position) {
      /*currentComponent.setState( {
      	apiResponse: currentComponent.state.apiResponse,
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });*/
				axios.post("http://localhost:8080", {
					lat: position.coords.latitude,
					long: position.coords.longitude,
				})
				.then( function (res) {
					console.log(res.data);
				 	
				 	currentComponent.setState( {
	      	apiResponse: res.data,
	        lat: position.coords.latitude,
	        long: position.coords.longitude,
	      })})
    }, 
    	function(error) {
    		if (error.code == error.PERMISSION_DENIED) {
    			console.log("Location Permission denied");
    			currentComponent.setState( {
    				apiResponse: "Location Permission denied",
    				lat: 0,
    				long: 0,
    			})
    		}
    	})
	}
	/*<p> 
	 {t his.state.apiResponse}
	 </p>*/
	/*componentWillMount() {
	    this.getChipotle();
	}*/
  render() {
  	return (
	    <div className="App">
	      <header className="App-header">  
	        <p>
	        Is my Chipotle open?
	        </p>
	        <p>{this.state.apiResponse}</p>
	      </header>
	    </div>
	  );
	}
}

export default App;
