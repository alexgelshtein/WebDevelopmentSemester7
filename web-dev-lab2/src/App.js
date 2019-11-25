import React, { Component } from 'react';
import './App.css';
import GeoLocation from './Components/GeoLocation/GeoLocation';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GeoLocation />
      </div>
    );
  }
}

export default App;