import React from "react";
import { throttle, cloneDeep } from "lodash";
import pathast from "path-ast";
// import { Grid, Cell } from "rgx";
import Header from "./Header";
import Canvas from "./Canvas";
import Commands from "./Commands";
import UrlHistory from "./UrlHistory";
import "./app.css";

const Grid = ({ children }) => {
  return <>{children}</>;
};

const Cell = ({ children }) => {
  return <>{children}</>;
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ast: pathast.parse("M8 48 L56 48 L32 12 Z"),
      current: 1, // current point
      selected: false, // full path selected
      width: 64,
      height: 64,
      zoom: 6,
      grid: true,
      resolution: 2,
      snap: true,
      preview: false,
      mode: "select",
      history: [],
      isPointMoving: false,
      isTranslating: false,
      isScaling: false,
      transformParams: false,
      transformStart: false,
    };
    this.updateAst = this.updateAst.bind(this);
    this.setHistory = this.setHistory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectPoint = this.selectPoint.bind(this);
    this.updateState = this.updateState.bind(this);
    this.toggle = this.toggle.bind(this);
    this.undo = this.undo.bind(this);
  }

  updateAst(ast) {
    // throttle(this.setHistory, 1000)(ast)
    // Consider setting this on mouseup/keyup?
    this.setHistory(ast);
    this.setState({ ast });
  }

  setHistory(ast) {
    const { history } = this.state;
    if (history.length && history[0] !== pathast.stringify(ast)) {
      history.unshift(cloneDeep(ast));
    } else if (!history.length) {
      history.unshift(cloneDeep(ast));
    }
    if (history.length > 128) {
      history.pop();
    }
    this.setState({ history });
  }

  handleChange(e) {
    const key = e.target.name;
    const val = parseFloat(e.target.value) || e.target.value;
    this.setState({ [key]: val });
  }

  selectPoint(i) {
    this.setState({ selected: false, current: i });
  }

  toggle(key) {
    const val = !this.state[key];
    this.setState({ [key]: val });
  }

  updateState(state) {
    this.setState(state);
  }

  undo() {
    const { history, ast } = this.state;
    if (history.length) {
      const newAst = history.shift();
      this.setState({ ast: newAst });
    }
  }

  handleKeyDown(e) {
    if (e.metaKey && e.keyCode === 90) {
      e.preventDefault();
      this.undo();
    }
  }

  render() {
    const { state } = this;
    const { props } = this;
    const style = {
      color: "white",
      backgroundColor: props.colors.dark,
    };

    return (
      <div onKeyDown={this.handleKeyDown.bind(this)} style={style}>
        <Header />
        <Grid gutter={8} min={256}>
          <Cell min={320}>
            <Canvas
              {...props}
              {...state}
              handleChange={this.handleChange}
              selectPoint={this.selectPoint}
              toggle={this.toggle}
              updateAst={this.updateAst}
              updateState={this.updateState}
            />
          </Cell>
          <Cell max={320} min={256}>
            <Commands
              {...props}
              {...state}
              selectPoint={this.selectPoint}
              updateAst={this.updateAst}
            />
          </Cell>
        </Grid>
        <UrlHistory {...props} {...state} updateAst={this.updateAst} />
      </div>
    );
  }
}

export default App;
