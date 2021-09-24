import React from "react";
import data from "../root/data";

const { scale, colors } = data;
class LinkBtn extends React.Component {
  render() {
    const { props } = this;
    const text = props.text || props.children;
    const s = {
      fontSize: 14,
      fontWeight: "bold",
      fontFamily: "inherit",
      textDecoration: "none",
      lineHeight: `${scale[6] - 2 * scale[1]}px`,
      height: scale[6],
      margin: 0,
      padding: scale[1],
      boxSizing: "border-box",
      border: "1px solid",
      borderRadius: 2,
      color: props.active ? colors.blue : "inherit",
      backgroundColor: props.active ? colors.darken[3] : "transparent",
      borderColor: props.active ? "transparent" : colors.darken[3],
      cursor: "pointer",
    };

    return (
      <a {...props} style={s}>
        {text}
      </a>
    );
  }
}

export default LinkBtn;
