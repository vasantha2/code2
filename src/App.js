//import logo from "./logo.svg";
//import React, { Component} from 'react';
//import axios  from "axios";
import "./App.css";
import Clock from 'react-live-clock';
import React, { Component } from "react";
import Logo from './logo.png';
//var geolocation = require("geolocation");
class  App extends React.Component {
    state= {
      latitude: null,
      longitude: null,
      temperature_2m: null
      //locationName: null
    }
  componentDidMount() {
    if(navigator.geolocation){
      this.getPostions()
      .then((position)=> {
        console.log(position.coords.latitude);
        //this.setState({latitude:position.coords.latitude})
        this.getWeather(position.coords.latitude,position.coords.longitude)
      })
    }
  }
  getPostions = () => {
    return new Promise(function(reslove,reject){
      navigator.geolocation.getCurrentPosition(reslove,reject);
    });
  }
  getWeather = async (latitude,longitude) => {
    const api= await fetch(
      
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`
      )
      const data= await api.json();
      console.log(data);
      this.setState(
        {
          temperature_2m:data.hourly_units.temperature_2m,
          //locationName: data.name

        }
      )

      
    }
  render(){
  return( 
   <React.Fragment>
        <div className="card-wraper">
        <div className="col-8 d-flex justify-content-center py-5">
           <div className="col-6 app-bg d-flex flex-wrap">
             <div className="col-12">
              <div className="justify-content-center d-flex col-12">
              <img  src={Logo} alt="Logo" />
              </div>
              <h2 className="text-white m-0">Pisa</h2>
              <p className="text-white m-0">Italy</p>
             </div>
             <div className="col-12 mt-auto d-flex">
              <div className="my-auto">
              <h2 className="text-white m-0">
                <Clock formate={'HH:mm:ss'} ticking={true}/>
              </h2>
              <p className="text-white m-0">
              <Clock
                   date={''}
                   format={'dddd, MMMM DD, YYYY'}/>
              </p>
              </div>
              <div className="ml-auto">
                <h1 className="text-white">{this.state.temperature_2m}</h1>
              </div>
             </div>
           </div>
        </div>
        </div>
   </React.Fragment>
  )
}
}

export default App