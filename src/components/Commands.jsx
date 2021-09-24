import React from "react";
// import { CarbonAd } from "blk";
import pathast from "path-ast";
import commands from "path-ast/lib/keys";
import roundAst from "../util/round-ast";
import findCenter from "../util/find-center";
import Command from "./Command";
import Button from "./Button";

// Commands Palette
//  - Stepper

class Commands extends React.Component {
  constructor() {
    super();
    this.addPoint = this.addPoint.bind(this);
  }

  addPoint() {
    const { ast, width, height } = this.props;
    const a = ast.commands[ast.commands.length - 2].params || {
      x: width / 2,
      y: height / 2,
    };
    const b = ast.commands[0].params || { x: width / 2, y: height / 2 };
    const newPoint = {
      type: "L",
      params: findCenter(a, b),
    };
    ast.commands.splice(ast.commands.length - 1, 0, newPoint);
    this.props.selectPoint(ast.commands.length - 2);
    this.props.updateAst(ast);
  }

  render() {
    const { props } = this;
    const { ast, styles, scale, colors } = props;
    const code = pathast.stringify(roundAst(props.ast, 2));

    const coms = ast.commands.map(com => {
      const params = commands[com.type].map((key, i) => {
        return {
          name: key,
          value: com.params[key],
        };
      });
      return {
        type: com.type,
        params,
      };
    });

    const s = {
      container: {
        position: "relative",
        boxSizing: "border-box",
        height: "calc(100vh - 48px)",
        paddingTop: scale[3],
        paddingBottom: 128,
      },
      inner: {
        overflow: "auto",
        WebkitOverflowScrolling: "touch",
        height: "100%",
      },
      ad: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        padding: 16,
      },
    };

    return (
      <div style={s.container}>
        <div style={s.inner}>
          <div>
            {coms.map((com, i) => {
              if (!com.params.length) {
                // return false
              }
              return <Command {...props} key={i} command={com} index={i} />;
            })}
          </div>
          <div
            style={{
              padding: scale[3],
            }}
          >
            <Button
              onClick={this.addPoint}
              style={{
                display: "block",
                textAlign: "center",
                width: "100%",
              }}
            >
              + Add Point
            </Button>
          </div>
        </div>
        <div style={s.ad}>
          <h2>ass</h2>
        </div>
      </div>
    );
  }
}

export default Commands;
