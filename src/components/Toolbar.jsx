import React from "react";
import makeSvg from "../util/make-svg";
import Button from "./Button";
import LinkBtn from "./LinkBtn";
import Table from "./Table";
import Stepper from "./Stepper";
import Spacer from "./Spacer";
import data from "../root/data";

const { scale } = data;

class Toolbar extends React.Component {
  render() {
    const { props } = this;

    function toggleGrid() {
      props.toggle("grid");
    }

    function toggleSnap() {
      props.toggle("snap");
    }

    function togglePreview() {
      props.toggle("preview");
    }

    function updateZoom(val) {
      props.updateState({ zoom: val });
    }

    const svg = makeSvg(props.ast);
    const blob = new Blob([svg], { type: "text/plain" });
    const download = (window.URL || window.webkitURL).createObjectURL(blob);

    const s = {
      container: {
        padding: scale[1],
      },
      text: {
        fontSize: 14,
      },
    };

    return (
      <div style={s.container}>
        <Table>
          <Table.Cell>
            <Button active={props.grid} onClick={toggleGrid}>
              Grid {props.grid && "•"}
            </Button>
          </Table.Cell>
          <Table.Cell>
            <Button active={props.snap} onClick={toggleSnap}>
              Snap {props.snap && "•"}
            </Button>
          </Table.Cell>
          <Table.Cell>
            <Button active={props.preview} onClick={togglePreview}>
              Preview {props.preview && "•"}
            </Button>
          </Table.Cell>
          <Table.Cell>
            <LinkBtn download="paths.svg" href={download}>
              Download
            </LinkBtn>
          </Table.Cell>
          <Table.Cell>
            <Spacer />
          </Table.Cell>
          <Table.Cell>
            <Stepper
              max={64}
              min={1}
              onChange={updateZoom}
              step={1}
              value={props.zoom}
            />
          </Table.Cell>
          <Table.Cell>
            <div style={s.text}>Zoom {props.zoom}x</div>
          </Table.Cell>
          <Table.Cell fill />
        </Table>
      </div>
    );
  }
}

export default Toolbar;
