import React from "react";
import commands from "path-ast/lib/keys";
import previousKey from "../util/get-previous-key";
import Select from "./Select";
import CompactInput from "./CompactInput";
import Button from "./Button";

class Command extends React.Component {
  constructor() {
    super();
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleParamChange = this.handleParamChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.removePoint = this.removePoint.bind(this);
  }

  handleTypeChange(e) {
    const { ast } = this.props;
    const { index } = this.props;
    const { value } = e.target;
    const command = ast.commands[index];
    const prevX = previousKey(ast.commands, index, "x");
    const prevY = previousKey(ast.commands, index, "y");
    command.type = value;
    const params = {};
    commands[value].forEach(key => {
      // Move this into a utility
      // Get prev x and y if all else fails
      if (typeof command.params[key] === "undefined") {
        if (key.match(/^x/)) {
          if (typeof command.params.x !== "undefined") {
            const x = parseFloat(command.params.x);
            const diff =
              x > prevX ? (x - prevX) / 2 + prevX : (prevX - x) / 2 + x;
            params[key] = diff;
          } else {
            params[key] = prevX;
          }
        } else if (key.match(/^y/)) {
          if (typeof command.params.y !== "undefined") {
            const y = parseFloat(command.params.y);
            const diff =
              y > prevY ? (y - prevY) / 2 + prevY : (prevY - y) / 2 + y;
            params[key] = diff;
          } else {
            params[key] = prevY;
          }
        } else {
          params[key] = 0;
        }
      } else {
        params[key] = command.params[key];
      }
    });
    command.params = params;
    this.props.updateAst(ast);
  }

  handleParamChange(e) {
    const { ast } = this.props;
    const names = e.target.name.split("-");
    const index = this.props.index || names[1];
    const param = names[2];
    const { value } = e.target;
    ast.commands[index].params[param] = value;
    this.props.updateAst(ast);
  }

  handleFocus(e) {
    const index = parseInt(e.target.name.split("-")[1], 10);
    this.props.selectPoint(index);
  }

  removePoint(e) {
    const { ast } = this.props;
    const { index } = this.props;
    ast.commands.splice(index, 1);
    this.props.updateAst(ast);
  }

  render() {
    const self = this;
    const { props } = this;
    const { command, current, index, scale, colors, snap, resolution } = props;
    const options = Object.keys(commands)
      .filter(key => {
        return key.match(/[A-Z]/);
      })
      .filter(key => {
        // Temporarily disable Arc
        return key !== "A";
      })
      .map(key => {
        return {
          label: key,
          value: key,
        };
      });

    const active = index === current;

    const s = {
      div: {
        // fontFamily: 'monospace',
        // paddingTop: scale[1],
        marginBottom: scale[1],
        color: active ? colors.blue : "inherit",
        // boxShadow: active ? 'inset 0 0 0 2px ' + colors.blue : null
      },
      grid: {
        // marginLeft: -scale[2],
        // marginRight: -scale[2],
      },
      cell: {
        display: "inline-block",
        verticalAlign: "middle",
        boxSizing: "border-box",
        width: "25%",
        // paddingLeft: scale[0],
        // paddingRight: scale[0],
      },
    };

    return (
      <div style={s.div}>
        <div style={s.grid}>
          <div style={s.cell}>
            <Select
              {...props}
              disabled={index === 0}
              hideLabel
              label="Command"
              name={`command-${index}`}
              onChange={index === 0 ? null : this.handleTypeChange}
              onFocus={this.handleFocus}
              options={options}
              value={command.type}
            />
          </div>
          {command.params.map((param, j) => {
            return (
              <div key={j} style={s.cell}>
                <CompactInput
                  type="number"
                  {...props}
                  label={param.name}
                  name={`command-${index}-${param.name}`}
                  onChange={self.handleParamChange}
                  onFocus={self.handleFocus}
                  step={snap ? resolution : 1}
                  value={Math.round(param.value * 100) / 100}
                />
              </div>
            );
          })}
          <div style={s.cell}>
            <Button
              disabled={index === 0}
              onClick={this.removePoint}
              style={{
                fontSize: 20,
                lineHeight: 1,
                paddingTop: 0,
                paddingBottom: 0,
                opacity: 0.5,
                display: index === 0 ? "none" : null,
              }}
              title="Remove Point"
            >
              &times;
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Command;
