import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { city: "Tehran", result: { degree: 12 } };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.calcWeather();
  }

  handleChange(name, e) {
    this.setState({
      [name]: e.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.calcWeather();
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

        this.setState({ result: { degree: res.data.main.temp + " C" } });
      })
      .catch(err => {
        this.setState({result: { degree: "No city found" }});

        });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Weather APP</h1>
        </header>
        <form onSubmit={this.handleSubmit}>
          <p className="App-intro">
            <input
              value={this.state.city}
              onChange={this.handleChange.bind(this, "city")}
              type="text"
            />
            {
              this.state.city &&
            <button type="button" onClick={this.handleClick.bind(this, "city")}>
              Show{" "}
            </button>
            }
            {
              this.state.city &&
            <button type="button" 
            onClick={()=>this.setState({city:''})}>
              Clear
            </button>
            }
          </p>
        </form>
        { this.state.city &&
        <p className="App-intro">{this.state.result.degree}</p>
        }
      </div>
    );
  }
}

export default App;
