import React from "react";
import Table from "./Table";
import Spacer from "./Spacer";
import LinkBtn from "./LinkBtn";

class Header extends React.Component {
  render() {
    const s = {
      header: {
        fontSize: 14,
        fontWeight: "bold",
        boxSizing: "border-box",
        height: 48,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
      },
      link: {
        textTransform: "uppercase",
        letterSpacing: ".2em",
        display: "inline-block",
        color: "inherit",
        textDecoration: "none",
      },
    };
    return (
      <header style={s.header}>
        <Table>
          <Table.Cell>
            <a href="http://jxnblk.com" style={s.link}>
              Jxnblk
            </a>
            {" / "}
            <a href="/paths" style={s.link}>
              Paths
            </a>
          </Table.Cell>
          <Table.Cell fill />
          <Table.Cell>
            <LinkBtn href="https://github.com/jxnblk/paths">GitHub</LinkBtn>
          </Table.Cell>
          <Table.Cell>
            <Spacer />
          </Table.Cell>
          <Table.Cell>
            {/* <TweetButton
              text="Build and edit SVGs in the browser"
              url="http://jxnblk.com/paths"
            /> */}
          </Table.Cell>
          {/*
          <Table.Cell>
            <
              user='jxnblk'
              repo='paths' />
          </Table.Cell>
          */}
        </Table>
      </header>
    );
  }
}

export default Header;
