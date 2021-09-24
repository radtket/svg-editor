import React from "react";

class Anchor extends React.Component {
  render() {
    const { props } = this;
    const { current, index, zoom, x, y } = props;
    const r = 12 / zoom;
    const styles = {
      point: {
        fill: "transparent",
        stroke: "none",
        cursor: "pointer",
      },
      pointRing: {
        opacity: current === index ? 0 : 0.5,
        vectorEffect: "non-scaling-stroke",
      },
    };

    return (
      <g>
        <circle
          cx={x}
          cy={y}
          onFocus={props.selectPoint.bind(this, index)}
          onMouseDown={props.onMouseDown.bind(this, index)}
          onMouseMove={props.onMouseMove}
          onMouseUp={props.onMouseUp}
          r={r * 2}
          style={styles.point}
          tabIndex="1"
        />
        <circle
          cx={x}
          cy={y}
          onMouseUp={props.onMouseUp}
          r={r}
          style={styles.pointRing}
        />
      </g>
    );
  }
}

export default Anchor;
