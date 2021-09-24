import React from "react";
import PropTypes from "prop-types";

class Select extends React.Component {
  render() {
    const { props } = this;
    const { scale, colors } = props;
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
      select: {
        fontSize: 14,
        fontFamily: "inherit",
        width: "100%",
        height: scale[6],
        paddingLeft: scale[1],
        paddingRight: scale[1],
        boxSizing: "border-box",
        border: 0,
        boxShadow: "none",
        borderRadius: 0,
        color: "inherit",
        backgroundColor: "transparent",
        // backgroundColor: colors.darken[3],
        // WebkitAppearance: 'none',
      },
    };

    if (props.hideLabel) {
      s.label.position = "absolute";
      s.label.height = 1;
      s.label.width = 1;
      s.label.overflow = "hidden";
      s.label.clip = "rect(1px, 1px, 1px, 1px)";
    }

    return (
      <div style={s.div}>
        <label htmlFor={props.name} style={s.label}>
          {props.label}
        </label>
        <select {...props} style={s.select}>
          {props.options.map((option, i) => {
            return <option key={i} {...option} />;
          })}
        </select>
      </div>
    );
  }
}

Select.propTypes = {
  name: PropTypes.string,
};

export default Select;
