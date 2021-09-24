import React from "react";
import data from "../root/data";

const { scale, colors } = data;
class CurrentAnchor extends React.Component {
  render() {
    const { props } = this;
    const { x, y, zoom, isMoving, current } = props;
    const r = 12 / zoom;
    const styles = {
      current: {
        fill: colors.blue,
        stroke: "none",
        opacity: 0.25,
        cursor: "pointer",
        vectorEffect: "non-scaling-stroke",
        transition: "r .1s ease-out",
      },
      currentRing: {
        stroke: colors.blue,
        strokeWidth: 3,
        vectorEffect: "non-scaling-stroke",
        transition: "r .05s ease-out",
      },
    };

    if (current < 0) {
      return false;
    }

    return (
      <g>
        <circle
          cx={x}
          cy={y}
          onMouseDown={props.onMouseDown.bind(this, ["x", "y"])}
          onMouseMove={props.onMouseMove}
          onMouseUp={props.onMouseUp}
          r={isMoving ? r * 2 : r}
          style={styles.current}
          tabIndex="1"
        />
        <circle
          cx={x}
          cy={y}
          onMouseUp={props.onMouseUp}
          r={isMoving ? r * 1.25 : r}
          style={styles.currentRing}
        />
      </g>
    );
  }
}

export default CurrentAnchor;
