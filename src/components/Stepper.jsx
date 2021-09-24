import React from "react";
import PropTypes from "prop-types";
import data from "../root/data";
import Button from "./Button";

const { scale, colors } = data;

class Stepper extends React.Component {
  constructor() {
    super();
    this.decrement = this.decrement.bind(this);
    this.increment = this.increment.bind(this);
  }

  decrement() {
    const { props } = this;
    const val = props.value - props.step;
    if (val > props.min - props.step) {
      props.onChange(val);
    }
  }

  increment() {
    const { props } = this;
    const val = props.value + props.step;
    if (val < props.max + props.step) {
      props.onChange(val);
    }
  }

  render() {
    const { props } = this;
    const radius = 2;
    const disabled = {
      left: props.value - props.step < props.min,
      right: props.value + props.step > props.max,
    };
    const s = {
      container: {
        display: "inline-block",
        whiteSpace: "nowrap",
      },
      left: {
        fontSize: 20,
        lineHeight: 1,
        paddingTop: 0,
        paddingBottom: 0,
        width: scale[6],
        borderRadius: [radius, 0, 0, radius].join(" "),
        opacity: disabled.left ? 0.5 : null,
      },
      right: {
        fontSize: 20,
        lineHeight: 1,
        paddingTop: 0,
        paddingBottom: 0,
        width: scale[6],
        marginLeft: -1,
        borderRadius: [0, radius, radius, 0].join(" "),
        opacity: disabled.right ? 0.5 : null,
      },
    };

    return (
      <div style={s.container}>
        <Button
          disabled={disabled.left}
          onClick={this.decrement}
          style={s.left}
          text="-"
          title="Decrement"
        />
        <Button
          disabled={disabled.right}
          onClick={this.increment}
          style={s.right}
          text="+"
          title="Increment"
        />
      </div>
    );
  }
}

Stepper.propTypes = {
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
};

Stepper.defaultProps = {
  value: 0,
  min: 0,
  max: 100,
  step: 1,
};

export default Stepper;
