import React from "react";
import data from "../root/data";

const { scale, colors } = data;

class Pad extends React.Component {
  render() {
    const { x, y, children } = this.props;
    const s = {
      paddingLeft: x ? scale[x] : 0,
      paddingRight: x ? scale[x] : 0,
      paddingTop: y ? scale[y] : 0,
      paddingBottom: y ? scale[y] : 0,
    };

    return <div style={s}>{children}</div>;
  }
}

export default Pad;
