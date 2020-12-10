import React, { Component } from 'react';
import RandomPlanet from '../random-planet';
import './app.css';

export default class App extends Component {
  render() {
    return (
            <div className="app">
                <RandomPlanet/>
            </div>
    );
  }
}
