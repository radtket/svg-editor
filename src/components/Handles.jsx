import React from "react";
import { cloneDeep, findLastIndex } from "lodash";
import { stringify } from "path-ast";
import previousKey from "../util/get-previous-key";
import data from "../root/data";
import Anchor from "./Anchor";
import CurrentAnchor from "./CurrentAnchor";
import CurveHandles from "./CurveHandles";
import PathHandles from "./PathHandles";

const { scale, colors } = data;

class Handles extends React.Component {
  constructor() {
    super();
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleAddPoint = this.handleAddPoint.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleTranslate = this.handleTranslate.bind(this);
    this.handleScale = this.handleScale.bind(this);
  }

  handleMouseDown(params, e) {
    const { updateState } = this.props;
    if (typeof params === "number") {
      this.props.selectPoint(params);
      params = ["x", "y"];
    } else if (Array.isArray(params)) {
    }
    updateState({
      isPointMoving: true,
      transformParams: params,
    });
  }

  handleMouseUp(e) {
    const { updateState } = this.props;
    updateState({
      isPointMoving: false,
      isTranslating: false,
      isScaling: false,
      transformParams: false,
      transformStart: false,
    });
  }

  handleMouseLeave(e) {
    const { updateState } = this.props;
    updateState({
      isPointMoving: false,
      isTranslating: false,
      isScaling: false,
      transformParams: false,
      transformStart: false,
    });
  }

  handleMouseMove(e) {
    const {
      ast,
      updateAst,
      updateState,
      isPointMoving,
      isTranslating,
      isScaling,
      transformStart,
      transformParams,
      current,
      width,
      height,
      snap,
      zoom,
      padding,
      resolution,
    } = this.props;
    const newAst = cloneDeep(ast);
    const ev = e.nativeEvent;
    let x = ev.offsetX / zoom - padding;
    let y = ev.offsetY / zoom - padding;
    if (snap) {
      x = Math.floor(x / resolution) * resolution || 0;
      y = Math.floor(y / resolution) * resolution || 0;
    }
    if (isPointMoving) {
      const i = current;
      const { params } = newAst.commands[i];
      const px = transformParams[0];
      const py = transformParams[1];
      if (x < 0) {
        x = 0;
      } else if (x > width) {
        x = width;
      }
      if (y < 0) {
        y = 0;
      } else if (y > height) {
        y = height;
      }
      if (typeof params[px] !== "undefined") {
        params[px] = x;
      }
      if (typeof params[py] !== "undefined") {
        params[py] = y;
      }
      updateAst(newAst);
    } else if (isTranslating) {
      newAst.translate(x - transformStart.x, y - transformStart.y);
      updateState({ transformStart: { x, y } });
      updateAst(newAst);
    } else if (isScaling) {
      const center = newAst.getCenter();
      const cx = center.x; // zoom // - padding
      const cy = center.y; // zoom // - padding
      const xN = (x - cx) / (transformStart.x - cx);
      const yN = (y - cy) / (transformStart.y - cy);
      const n = Math.abs(xN) >= Math.abs(yN) ? xN : yN;
      if (isFinite(n) && n > 0) {
        // newAst.scale(n, c, c)
        newAst.scale(n);
        updateState({
          transformStart: { x, y },
        });
        updateAst(newAst);
      }
    }
  }

  handleAddPoint(i, e) {
    const { props } = this;
    const {
      ast,
      zoom,
      padding,
      current,
      snap,
      resolution,
      updateAst,
      selectPoint,
      updateState,
    } = this.props;
    const ev = e.nativeEvent;
    const newAst = cloneDeep(ast);
    let x = ev.offsetX / zoom - padding;
    let y = ev.offsetY / zoom - padding;
    if (snap) {
      x = Math.floor(x / resolution) * resolution || 0;
      y = Math.floor(y / resolution) * resolution || 0;
    }
    newAst.commands.splice(i, 0, {
      type: "L",
      params: {
        x,
        y,
      },
    });
    updateAst(newAst);
    selectPoint(i);
    updateState({
      isPointMoving: true,
      transformParams: ["x", "y"],
    });
  }

  handleTranslate(e) {
    const { zoom, padding, snap, resolution, updateState } = this.props;
    const ev = e.nativeEvent;
    let x = ev.offsetX / zoom - padding;
    let y = ev.offsetY / zoom - padding;
    if (snap) {
      x = Math.floor(x / resolution) * resolution || 0;
      y = Math.floor(y / resolution) * resolution || 0;
    }
    updateState({
      selected: true,
      isTranslating: true,
      transformStart: { x, y },
    });
  }

  handleScale(e) {
    const { zoom, padding, snap, resolution, updateState } = this.props;
    const ev = e.nativeEvent;
    let x = ev.offsetX / zoom - padding;
    let y = ev.offsetY / zoom - padding;
    if (snap) {
      x = Math.floor(x / resolution) * resolution || 0;
      y = Math.floor(y / resolution) * resolution || 0;
    }
    updateState({
      isScaling: true,
      transformStart: { x, y },
    });
  }

  handleKeyDown(e) {
    const { ast, current, width, height, snap, resolution, updateAst } =
      this.props;
    const newAst = cloneDeep(ast);
    const { params } = newAst.commands[current];
    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) {
      return;
    }
    switch (e.keyCode) {
      case 38: // Up
        e.preventDefault();
        if (params.y > 0) {
          params.y = snap ? params.y - resolution : params.y - 1;
        }
        break;
      case 40: // Down
        e.preventDefault();
        if (params.y < height) {
          params.y = snap ? params.y + resolution : params.y + 1;
        }
        break;
      case 37: // Left
        if (params.x > 0) {
          params.x = snap ? params.x - resolution : params.x - 1;
        }
        break;
      case 39: // Right
        if (params.x < width) {
          params.x = snap ? params.x + resolution : params.x + 1;
        }
        break;
    }
    updateAst(newAst);
  }

  render() {
    const self = this;
    const { props } = this;
    const { ast, current, zoom, preview, selected } = this.props;
    const newAst = cloneDeep(ast);
    const q3 = 32 / zoom;

    const d = stringify(ast);

    const anchors = ast.commands
      .filter(command => {
        return Object.keys(command.params).length;
      })
      .map((command, i) => {
        const { params } = command;
        return {
          x:
            typeof params.x !== "undefined"
              ? params.x
              : previousKey(ast.commands, i, "x"),
          y:
            typeof params.y !== "undefined"
              ? params.y
              : previousKey(ast.commands, i, "y"),
        };
      });

    const segments = newAst.commands
      .filter(command => {
        return Object.keys(command.params).length || command.type.match(/z|Z/);
      })
      .map((command, i) => {
        if (command.type.match(/z|Z/)) {
          const lastMIndex = findLastIndex(ast.commands, (command, j) => {
            if (j > i) {
              return false;
            }
            return command.type.match(/m|M/);
          });
          command.type = "L";
          command.params = {
            x: ast.commands[lastMIndex].params.x || 0,
            y: ast.commands[lastMIndex].params.y || 0,
          };
        }
        const segment = {
          commands: [
            {
              type: "M",
              params: {
                x: previousKey(ast.commands, i, "x"),
                y: previousKey(ast.commands, i, "y"),
              },
            },
            command,
          ],
        };
        return segment;
      });

    const params = ast.commands[current] ? ast.commands[current].params : {};

    const currentAnchor = {
      x:
        typeof params.x !== "undefined"
          ? params.x
          : previousKey(ast.commands, current, "x"),
      y:
        typeof params.y !== "undefined"
          ? params.y
          : previousKey(ast.commands, current, "y"),
    };

    const styles = {
      g: {
        fill: "none",
        stroke: "currentcolor",
        strokeWidth: 2,
      },
      mouseRect: {
        stroke: "none",
        fill: "transparent",
      },
      curvePoint: {
        fill: colors.blue,
        stroke: "none",
        cursor: "pointer",
      },
      path: {
        fill: "transparent",
        stroke: "none",
        cursor: "move",
      },
      segment: {
        fill: "none",
        stroke: "transparent",
        strokeWidth: 4,
        cursor: "pointer",
      },
    };

    if (preview) {
      return false;
    }

    return (
      <g
        onKeyDown={this.handleKeyDown}
        onMouseLeave={this.handleMouseLeave}
        onMouseUp={this.handleMouseUp}
        style={styles.g}
      >
        >
        <rect
          height={props.height + props.padding * 2}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          style={styles.mouseRect}
          transform={`translate(${-props.padding} ${-props.padding})`}
          width={props.width + props.padding * 2}
        />
        <rect
          height={props.height}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          style={styles.mouseRect}
          width={props.width}
        />
        <path
          d={d}
          onMouseDown={this.handleTranslate}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          style={styles.path}
        />
        {segments.map((segment, i) => {
          const segD = stringify(segment);
          return (
            <path
              key={i}
              ref={`segment-${i}`}
              d={segD}
              onMouseDown={this.handleAddPoint.bind(this, i)}
              onMouseUp={this.handleMouseUp}
              style={styles.segment}
            />
          );
        })}
        {anchors.map((anchor, i) => {
          return (
            <Anchor
              key={i}
              {...props}
              index={i}
              onMouseDown={self.handleMouseDown}
              onMouseMove={self.handleMouseMove}
              onMouseUp={self.handleMouseUp}
              x={anchor.x}
              y={anchor.y}
            />
          );
        })}
        {/*
        {selected && (
          <PathHandles {...props}
            handleScale={this.handleScale}
            handleMouseMove={this.handleMouseMove}
            handleMouseUp={this.handleMouseUp}
          />
          )}
        */}
        <CurrentAnchor
          {...props}
          {...currentAnchor}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
        />
        <CurveHandles
          {...props}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
        />
      </g>
    );
  }
}

export default Handles;
