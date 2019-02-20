import React from "react";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import TextField from "@material-ui/core/TextField";

export default class RangeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }
  render() {
    return (
      <div style={{ margin: "20px 0 30px" }}>
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
          trackStyle={[
            {
              backgroundColor: "#2399d1",
              height: 8
            },
            {
              backgroundColor: "#2399d1",
              height: 8
            }
          ]}
          railStyle={{
            backgroundColor: "#FFFFFF",
            height: 8,
            border: "1px solid #2399d1"
          }}
          handleStyle={[
            { borderColor: "#2399d1", width: 25, height: 25, marginTop: -9 },
            { borderColor: "#2399d1", width: 25, height: 25, marginTop: -9 }
          ]}
        />
        <div style={{ marginTop: 30, display: "flex", alignItems: "center" }}>
          <TextField
            onChange={e => {
              var maxValue = parseInt(this.state.value[1]);
              var NewValue = [e.target.value, maxValue];
              this.setState({ value: NewValue });
            }}
            value={this.state.value[0]}
            variant="outlined"
          />
          <span style={{ margin: "0 1rem" }}>-</span>
          <TextField
            onChange={e => {
              var minValue = parseInt(this.state.value[0]);
              var NewValue = [minValue, e.target.value];
              this.setState({ value: NewValue });
            }}
            value={this.state.value[1]}
            variant="outlined"
          />
        </div>
      </div>
    );
  }
}
