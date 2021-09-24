import React from "react";

class Grid extends React.Component {
  render() {
    const { grid, preview, width, height, resolution } = this.props;

    function getLines(x, y, step) {
      const lines = [];
      for (var i = 0; i <= y; i++) {
        lines.push(["M", 0, i * step, "H", width].join(" "));
      }
      for (var i = 0; i <= x; i++) {
        lines.push(["M", i * step, 0, "V", height].join(" "));
      }
      return lines.join(" ");
    }

    const minor = [
      getLines(width / resolution, height / resolution, resolution),
    ].join(" ");
    const major = [getLines(width / 16, height / 16, 16)].join(" ");

    const styles = {
      g: {
        fill: "none",
        stroke: "currentcolor",
      },
      minor: {
        strokeWidth: 0.5,
        vectorEffect: "non-scaling-stroke",
        opacity: 0.5,
      },
      major: {
        strokeWidth: 0.5,
        vectorEffect: "non-scaling-stroke",
        opacity: 0.75,
      },
    };

    if (!grid || preview) {
      return false;
    }

    return (
      <g style={styles.g}>
        <path d={minor} style={styles.minor} />
        <path d={major} style={styles.major} />
      </g>
    );
  }
}

export default Grid;
