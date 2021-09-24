import React from "react";
import { min, max } from "lodash";
import data from "../root/data";

const { scale, colors } = data;

class PathHandles extends React.Component {
  render() {
    const { ast, handleScale, handleMouseMove, handleMouseUp } = this.props;
    const xPoints = ast.commands
      .map(command => {
        return command.params.x || null;
      })
      .filter(point => {
        return point;
      });
    const yPoints = ast.commands
      .map(command => {
        return command.params.y || null;
      })
      .filter(point => {
        return point;
      });
    const minX = min(xPoints);
    const maxX = max(xPoints);
    const minY = min(yPoints);
    const maxY = max(yPoints);
    const width = maxX - minX + 6;
    const height = maxY - minY + 6;
    const x = minX - 3;
    const y = minY - 3;
    const styles = {
      rect: {
        fill: "none",
        stroke: colors.blue,
        strokeWidth: 0.25,
        opacity: 0.5,
      },
      handle: {
        fill: colors.blue,
        stroke: "none",
        cursor: "nwse-resize",
      },
      handle2: {
        fill: colors.blue,
        stroke: "none",
        cursor: "nesw-resize",
      },
    };

    const handles = [
      {
        x: x - 1,
        y: y - 1,
        style: styles.handle,
      },
      {
        x: maxX + 2,
        y: maxY + 2,
        style: styles.handle,
      },
      {
        x: x - 1,
        y: maxY + 2,
        style: styles.handle2,
      },
      {
        x: maxX + 2,
        y: y - 1,
        style: styles.handle2,
      },
    ];

    return (
      <g>
        <rect height={height} style={styles.rect} width={width} x={x} y={y} />
        {handles.map((handle, i) => {
          return (
            <rect
              key={i}
              height={2}
              width={2}
              {...handle}
              onMouseDown={handleScale}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            />
          );
        })}
      </g>
    );
  }
}

export default PathHandles;
