import React from "react";
import data from "../root/data";
import previousKey from "../util/get-previous-key";

const { scale, colors } = data;

class CurveHandles extends React.Component {
  render() {
    const { props } = this;
    const { ast, current, zoom } = props;
    const params = ast.commands[current] ? ast.commands[current].params : {};
    const handles = [];
    const w = 10 / zoom;

    if (Object.keys(params).length > 2) {
      const { x1, y1, x2, y2 } = params;
      if (typeof x1 !== "undefined" && typeof y1 !== "undefined") {
        // Show lines for Q (both points)
        handles.push({
          x: x1,
          y: y1,
          params: ["x1", "y1"],
          to: {
            x: previousKey(ast.commands, current, "x"),
            y: previousKey(ast.commands, current, "y"),
          },
        });
      }
      if (typeof x2 !== "undefined" && typeof y2 !== "undefined") {
        handles.push({
          x: x2,
          y: y2,
          params: ["x2", "y2"],
          to: {
            x: params.x,
            y: params.y,
          },
        });
      }
    }

    const styles = {
      handle: {
        fill: colors.blue,
        stroke: "none",
        cursor: "pointer",
      },
      hit: {
        fill: "transparent",
        stroke: "none",
        cursor: "pointer",
      },
      line: {
        stroke: colors.blue,
        strokeWidth: 0.25,
        opacity: 0.5,
      },
    };

    if (!handles.length) {
      return false;
    }

    return (
      <g>
        {handles.map(function (h, i) {
          return (
            <g key={i}>
              <path
                d={["M", h.x, h.y, "L", h.to.x, h.to.y].join(" ")}
                style={styles.line}
              />
              <rect
                height={w}
                onMouseUp={props.onMouseUp}
                style={styles.handle}
                width={w}
                x={h.x - w / 2}
                y={h.y - w / 2}
              />
              <rect
                height={2 * w}
                onMouseDown={props.onMouseDown.bind(this, h.params)}
                onMouseMove={props.onMouseMove}
                onMouseUp={props.onMouseUp}
                style={styles.hit}
                width={2 * w}
                x={h.x - w}
                y={h.y - w}
              />
            </g>
          );
        })}
      </g>
    );
  }
}

export default CurveHandles;
