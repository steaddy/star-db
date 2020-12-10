import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import './random-planet.css';

export default class RandomPlanet extends Component {
    state = {
      planet: {},
      loading: true,
      error: false,
    };

    swapiService = new SwapiService();

    componentDidMount() {
      this.updatePlanet();
      setInterval(this.updatePlanet, 7000);
    }

    onPlanetLoaded = (planet) => this.setState({ planet, loading: false });

    onError = (e) => {
      this.setState({ error: true, loading: false });
    };

    updatePlanet = () => {
      const id = Math.floor(Math.random() * 25 + 2);
      this.swapiService.getPlanet(id)
        .then(this.onPlanetLoaded)
        .catch(this.onError);
    }

    render() {
      const {
        planet,
        loading,
        error,
      } = this.state;

      const hasData = !(loading || error);

      const errorMessage = error ? <ErrorIndicator/> : null;
      const spinner = loading ? <Spinner/> : null;
      const content = hasData ? <PlanetView planet={planet}/> : null;

      return (
            <div className="random-planet jumbotron rounded">
                {spinner}
                {content}
                {errorMessage}
            </div>
      );
    }
}

const PlanetView = ({ planet }) => {
  const {
    id,
    name,
    population,
    rotationPeriod,
    diameter,
  } = planet;
  return (
        <React.Fragment>
            <img src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt="Random planet"
                 className="planet-image"/>
            <div>
                <h4>{ name }</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{ population }</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{ rotationPeriod }</span></li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{ diameter }</span></li>
                </ul>
            </div>
        </React.Fragment>
  );
};
