import React from "react";
import Header from "./Header";
import Svg from "./Svg";
import Toolbar from "./Toolbar";

class Canvas extends React.Component {
  constructor() {
    super();
    this.deselect = this.deselect.bind(this);
  }

  deselect(e) {
    e.stopPropagation();
    this.props.selectPoint(-1);
  }

  render() {
    const { props } = this;
    const styles = {
      container: {
        position: "relative",
        height: "calc(100vh - 48px)",
      },
      viewport: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 48,
        left: 0,
        overflow: "auto",
        WebkitOverflowScrolling: "touch",
      },
      table: {
        display: "table",
        width: "100%",
        height: "100%",
      },
      cell: {
        position: "relative",
        display: "table-cell",
        verticalAlign: "middle",
      },
      toolbar: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 48,
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
      },
    };

    return (
      <div onClick={this.deselect} style={styles.container}>
        <div style={styles.viewport}>
          <div style={styles.table}>
            <div style={styles.cell}>
              <Svg {...props} />
            </div>
          </div>
        </div>
        <div style={styles.toolbar}>
          <Toolbar {...props} />
        </div>
      </div>
    );
  }
}

export default Canvas;
