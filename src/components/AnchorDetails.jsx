import React from "react";
import { round } from "lodash";
import previousKey from "../util/get-previous-key";

import data from "../root/data";
import Table from "./Table";
import Button from "./Button";

const { colors } = data;

class AnchorDetails extends React.Component {
  constructor() {
    super();
    this.removePoint = this.removePoint.bind(this);
  }

  removePoint(e) {
    const { props } = this;
    const { ast, current } = props;
    ast.commands.splice(current, 1);
    props.updateAst(ast);
    React.findDOMNode(e.target).blur();
  }

  render() {
    const { props } = this;
    const { ast, current, width, zoom, padding, preview } = props;
    const { type, params } = ast.commands[current]
      ? ast.commands[current]
      : { type: false, params: {} };

    // let x = typeof params.x !== 'undefined' ? params.x : previousKey(ast.commands, current, 'x')
    const y =
      typeof params.y !== "undefined"
        ? params.y
        : previousKey(ast.commands, current, "y");

    const styles = {
      outer: {
        position: "absolute",
        top: y * zoom + padding * zoom,
        left: width * zoom + padding * zoom + 32,
        color: colors.blue,
        transitionProperty: "top",
        transitionDuration: ".2s",
        transitionTimingFunction: "ease-out",
        display: current < 0 ? "none" : null,
      },
      values: {
        fontSize: 12,
        whiteSpace: "nowrap",
      },
      removeButton: {
        fontSize: 20,
        display: current === 0 ? "none" : null,
      },
    };

    if (preview) {
      return false;
    }

    return (
      <div style={styles.outer}>
        <Table>
          <Table.Cell>
            <div>{type}</div>
            <div style={styles.values}>
              {Object.keys(params).map((key, i) => {
                return <span key={i}>{round(params[key], 2)} </span>;
              })}
            </div>
          </Table.Cell>
          <Table.Cell>
            <Button
              onClick={this.removePoint}
              style={styles.removeButton}
              text="&times;"
              title="Remove Point"
            />
          </Table.Cell>
        </Table>
      </div>
    );
  }
}

export default AnchorDetails;
