import React from "react";
import pathast from "path-ast";

class Path extends React.Component {
  render() {
    const { ast, preview } = this.props;

    const styles = {
      opacity: preview ? 1 : 0.75,
    };

    return (
      <g style={styles}>
        <path d={pathast.stringify(ast)} />
      </g>
    );
  }
}

export default Path;
