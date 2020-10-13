import React, { Component } from "react";
import { css } from "emotion";
import Brick from "./Brick";

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { bricks, columns, rows, onBrickClick } = this.props;
    return (
      <>
        <div
          className={css`
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-columns: repeat(${columns}, minmax(35px, 1fr));
            grid-template-rows: repeat(${rows}, minmax(35px, 1fr));
            grid-gap: 5px;
            overflow: auto;
          `}>
            {bricks && bricks.map((brick, index) => (
              <Brick
                key={brick.number}
                index={index}
                brick={brick}
                onBrickClick={onBrickClick}>
              </Brick>
            ))}
        </div>
      </>
    );
  }
}

export default Grid;
