import React from "react";
import PropTypes from "prop-types";
import data from "../root/data";

const { scale, colors } = data;
class Input extends React.Component {
  render() {
    const { props } = this;
    const { name, label } = props;
    const s = {
      div: {
        marginBottom: props.mb ? 12 : null,
      },
      label: {
        fontSize: 14,
        fontWeight: "bold",
        display: "block",
        marginBottom: 4,
      },
      input: {
        fontSize: 16,
        fontFamily: "inherit",
        width: "100%",
        height: scale[6],
        paddingLeft: 8,
        paddingRight: 8,
        boxSizing: "border-box",
        color: "inherit",
        backgroundColor: colors.darken[3],
        borderColor: colors.lighten[3],
        borderWidth: 1,
        boxShadow: "none",
        borderRadius: 2,
        WebkitAppearance: "none",
      },
    };
    const type = props.type || "text";

    return (
      <div style={s.div}>
        <label htmlFor={name} style={s.label}>
          {label}
        </label>
        <input {...props} style={s.input} type={type} />
      </div>
    );
  }
}

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mb: PropTypes.bool,
};

export default Input;
