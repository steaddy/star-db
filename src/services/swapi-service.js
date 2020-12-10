/* eslint no-underscore-dangle: 0 */
export default
class SwapiService {
  constructor() {
    const _apiBase = 'https://swapi.dev/api';

    this.getResource = async (url) => {
      const res = await fetch(`${_apiBase}${url}`);
      if (!res.ok) throw new Error(`Could not Fetch ${url}`);
      return res.json(res);
    };

    this.getAllPeople = async () => {
      const people = await this.getResource('/people');
      return people.map(this._transformPerson);
    };

    this.getPerson = async (id) => {
      const person = await this.getResource(`/people/${id}`);
      return this._transformPerson(person);
    };

    this.getAllPlanets = async () => {
      const planets = await this.getResource('/starships');
      return planets.map(this._transformPlanet);
    };

    this.getPlanet = async (id) => {
      const planet = await this.getResource(`/planets/${id}`);
      return this._transformPlanet(planet);
    };

    this.getAllStarships = async () => {
      const starships = await this.getResource('/starships');
      return starships.map(this._transformPlanet);
    };

    this.getStarship = async (id) => {
      const starship = await this.getResource(`/starships/${id}`);
      return this._transformStarship(starship);
    };

    this._extractId = (item) => {
      const idRegExp = /\/([0-9]*)\/$/;
      return item.url.match(idRegExp)[1];
    };

    this._transformPlanet = (planet) => ({
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
    });

    this._transformStarship = (starship) => ({
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.costInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity,
    });

    this._transformPerson = (person) => ({
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birthYear,
      eyeColor: person.eyeColor,
    });
  }
}
