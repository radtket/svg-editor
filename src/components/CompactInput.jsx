import React from "react";
import PropTypes from "prop-types";
import data from "../root/data";

const { scale, colors } = data;
class CompactInput extends React.Component {
  render() {
    const { props } = this;
    const { name, label } = props;
    const s = {
      div: {
        display: "table",
        width: "100%",
        marginBottom: props.mb ? 4 : null,
        // backgroundColor: colors.darken[3],
        backgroundColor: "transparent",
        // borderColor: colors.lighten[3],
        // borderWidth: 1,
        border: "none",
        borderRadius: 2,
      },
      label: {
        fontSize: 14,
        fontWeight: "bold",
        display: "table-cell",
        paddingLeft: 8,
        paddingRight: 4,
        whiteSpace: "nowrap",
        // verticalAlign: 'middle',
        verticalAlign: "baseline",
        opacity: 0.5,
        // color: colors.lighten[3]
      },
      input: {
        fontSize: 16,
        fontFamily: "inherit",
        display: "table-cell",
        verticalAlign: "baseline",
        width: "100%",
        height: scale[6],
        paddingLeft: 0,
        paddingRight: 8,
        boxSizing: "border-box",
        color: "inherit",
        boxShadow: "none",
        border: "none",
        backgroundColor: "transparent",
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

CompactInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mb: PropTypes.bool,
};

export default CompactInput;
