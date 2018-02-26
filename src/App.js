import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { city: "Tehran", result: { degree: 12 } };
  }

  componentDidMount() {
    this.calcWeather();
  }

  handleChange(name, e) {
    this.setState({
      [name]: e.target.value
    });
  }

  handleClick(e) {
    this.calcWeather();
  }

  calcWeather() {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${
          this.state.city
        }&APPID=bd5e378503939ddaee76f12ad7a97608&units=metric`
      )
      .then(res => {

        this.setState({ result: { degree: res.data.main.temp } });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Weather APP</h1>
        </header>

        <form>
          <p className="App-intro">
            <input
              value={this.state.city}
              onChange={this.handleChange.bind(this, "city")}
              type="text"
            />
            <button type="button" onClick={this.handleClick.bind(this, "city")}>
              Show{" "}
            </button>
          </p>
        </form>

        <p className="App-intro">{this.state.result.degree} C</p>
      </div>
    );
  }
}

export default App;
