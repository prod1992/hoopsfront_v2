import React from "react";
import Slider, { Range } from "rc-slider";
// We can just import Slider or Range to reduce bundle size
// import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';
import "rc-slider/assets/index.css";

export default class RangeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }
  render() {
    return (
      <div>
        <Range
          value={this.state.value}
          onChange={e => {
            this.props.onChange(e);
            this.setState({
              value: e
            });
          }}
          min={+this.props.min}
          max={+this.props.max}
          defaultValue={[+this.props.min, +this.props.max]}
        />
        <input
          onChange={e => {
            var maxValue = parseInt(this.state.value[1]);
            var NewValue = [e.target.value, maxValue];
            this.setState({ value: NewValue });
          }}
          value={this.state.value[0]}
        />
        <input
          onChange={e => {
            var minValue = parseInt(this.state.value[0]);
            var NewValue = [minValue, e.target.value];
            this.setState({ value: NewValue });
          }}
          value={this.state.value[1]}
        />
      </div>
    );
  }
}
