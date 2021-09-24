import React from "react";
import Grid from "./Grid";
import Path from "./Path";
import Guides from "./Guides";
import Handles from "./Handles";

class Svg extends React.Component {
  render() {
    const { props } = this;
    const { width, height, zoom, padding } = props;
    const padX = width + padding * 2;
    const padY = height + padding * 2;
    function stopClick(e) {
      e.stopPropagation();
    }
    const styles = {
      outer: {
        position: "relative",
        width: padX * zoom,
        margin: "auto",
      },
      svg: {
        display: "block",
        margin: "auto",
        overflow: "visible",
      },
    };

    return (
      <div style={styles.outer}>
        <svg
          fill="currentcolor"
          height={padY * zoom}
          onClick={stopClick}
          style={styles.svg}
          viewBox={[0, 0, padX, padY].join(" ")}
          width={padX * zoom}
        >
          <g transform={`translate(${padding} ${padding})`}>
            <Grid {...props} />
            <Path {...props} />
            <Guides {...props} />
            <Handles {...props} />
          </g>
        </svg>
      </div>
    );
  }
}

export default Svg;
