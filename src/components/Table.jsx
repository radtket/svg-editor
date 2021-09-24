import React from "react";
import data from "../root/data";

const { scale } = data;
class Table extends React.Component {
  render() {
    const { props } = this;
    const s = {
      outer: {
        marginLeft: props.pad ? -scale[0] : 0,
        marginRight: props.pad ? -scale[0] : 0,
        marginBottom: props.mb ? 8 : null,
      },
      inner: {
        display: "table",
        width: "100%",
      },
    };

    const children = React.Children.map(props.children, (child, i) => {
      const pad = props.pad || false;
      return React.cloneElement(child, { pad });
    });
    return (
      <div style={s.outer}>
        <div style={s.inner}>{children}</div>
      </div>
    );
  }
}

class Cell extends React.Component {
  render() {
    const { props } = this;
    const s = {
      display: "table-cell",
      verticalAlign: "middle",
      // whiteSpace: props.nowrap ? 'nowrap' : null,
      whiteSpace: "nowrap",
      width: props.fill ? "100%" : null,
      paddingLeft: props.pad ? scale[0] : 0,
      paddingRight: props.pad ? scale[0] : 0,
    };
    return <div style={s}>{props.children}</div>;
  }
}

Table.Cell = Cell;

export default Table;
