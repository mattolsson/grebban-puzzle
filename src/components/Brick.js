import React, { Component } from "react";
import { css } from "emotion";

class Brick extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { brick, onBrickClick, index } = this.props;
    return (
      <>
        <div
          className={css`
            background-color: ${brick.number === index + 1 ? '#9DD1DE' : '#000'};
            color: #fff;
            visibility: ${brick.number === 0 ? 'hidden' : 'visible'};
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
          onClick={() => onBrickClick(brick)}>
            <p className={css`
              margin: 0;
            `}>{brick.number}</p>
        </div>
      </>
    );
  }
}

export default Brick;
