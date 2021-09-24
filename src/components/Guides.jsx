import React from "react";
import pathast from "path-ast";
import getPrevKey from "../util/get-previous-key";
import data from "../root/data";

const { scale, colors } = data;
class Guides extends React.Component {
  render() {
    const { ast, current, preview } = this.props;
    const styles = {
      g: {
        fill: "none",
        stroke: "currentcolor",
        vectorEffect: "non-scaling-stroke",
      },
      guides: {
        vectorEffect: "non-scaling-stroke",
        strokeWidth: 2,
      },
      current: {
        vectorEffect: "non-scaling-stroke",
        strokeWidth: 3,
        stroke: colors.blue,
      },
    };

    const start = {
      type: "M",
      params: {
        x: getPrevKey(ast.commands, current, "x"),
        y: getPrevKey(ast.commands, current, "y"),
      },
    };

    let currentC = false;
    // Attempt to handle smoothto curves
    if (
      ast.commands[current] &&
      ast.commands[current].type.match(/(S|T)/) &&
      current > 1
    ) {
      currentC = {
        commands: [
          {
            type: "M",
            params: {
              x: getPrevKey(ast.commands, current - 1, "x"),
              y: getPrevKey(ast.commands, current - 1, "y"),
            },
          },
          ast.commands[current - 1],
          ast.commands[current],
        ],
      };
    } else if (ast.commands[current]) {
      currentC = {
        commands: [
          {
            type: "M",
            params: {
              x: getPrevKey(ast.commands, current, "x"),
              y: getPrevKey(ast.commands, current, "y"),
            },
          },
          ast.commands[current],
        ],
      };
    }

    const currentD = currentC ? pathast.stringify(currentC) : "";

    if (preview) {
      return false;
    }

    return (
      <g style={styles.g}>
        <path d={pathast.stringify(ast)} style={styles.guides} />
        <path d={currentD} style={styles.current} />
      </g>
    );
  }
}

export default Guides;
