import React from "react";
import Slider, { Range } from "rc-slider";
// We can just import Slider or Range to reduce bundle size
// import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';
import "rc-slider/assets/index.css";

export default class RangeComponent extends React.Component {
  render() {
    return (
      <div>
        <Range
          onChange={this.props.onChange}
          min={+this.props.min}
          max={+this.props.max}
          defaultValue={[+this.props.min, +this.props.max]}
        />
      </div>
    );
  }
}
