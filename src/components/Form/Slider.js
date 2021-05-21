import React, { Component } from "react";
import "./slider.css";

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: this.props.val,
    };
  }

  updateValue(event) {
    this.setState({ val: event.target.value });
  }

  render() {
    return (
      <>
        <label>
          {this.props.label} : {this.state.val}
        </label>
        <br />
        <input
          className="slider is-fullwidth is-circle"
          step="1"
          min={this.props.min}
          max={this.props.max}
          defaultValue={this.state.val}
          type="range"
          onChange={this.updateValue.bind(this)}
        ></input>
      </>
    );
  }
}

export default Slider;
