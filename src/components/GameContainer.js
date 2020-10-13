import React, { Component } from "react";
import { css } from "emotion";
import Grid from "./Grid";

class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: 5,
      rows: 5,
      originalList: [],
      bricks: [],
      isWinner: false,
    };
  }

  componentDidMount() {
    this.createBricksList(() => {
      this.randomizeList();
    });
  }

  createBricksList = (callback) => {
    const nrOfBricks = this.state.columns * this.state.rows;
    let originalList = [];

    for (let i = 0; i < nrOfBricks; i++) {
      originalList.push({
        number: i,
      });
    }

    this.setState({ originalList: originalList }, () => {
      callback();
    });
  };

  randomizeList = () => {
    const list = [...this.state.originalList];
    this.setState({ isWinner: false });

    for (let i = list.length - 1; i > 0; i--) {
      const randIndex = Math.floor(Math.random() * i);
      const tempBrick = list[i];
      list[i] = list[randIndex];
      list[randIndex] = tempBrick;
    }

    let row = 1;
    let column = 1;

    list.forEach((brick, index) => {
      if (index + 1 > row * this.state.columns) {
        row++;
        column = 1;
      }

      brick.row = row;
      brick.column = column;

      column++;
    });

    this.setState({ bricks: list }, () => {
      this.setState({ isWinner: this.isWinner() });
    });
  };

  moveBricks = (brick) => {
    const emptyBrickIndex = this.state.bricks.findIndex((b) => b.number === 0);
    const emptyBrick = this.state.bricks[emptyBrickIndex];
    const moveRow = brick.row === emptyBrick.row;
    const moveColumn = brick.column === emptyBrick.column;

    if (!moveRow && !moveColumn) {
      return;
    }

    const currentBrickIndex = this.state.bricks.findIndex(
      (b) => b.number === brick.number
    );
    const distans = Math.abs(
      emptyBrick.row - brick.row + (emptyBrick.column - brick.column)
    );

    let newList = [...this.state.bricks];

    for (let i = 1; i <= distans; i++) {
      const emptyPositionIndex = newList.findIndex((b) => b.number === 0);
      const emptyPosition = newList[emptyPositionIndex];
      const emptyIndexHigher = emptyPositionIndex > currentBrickIndex;
      let nextIndex = 0;

      if (moveColumn) {
        nextIndex = emptyIndexHigher
          ? emptyPositionIndex - this.state.columns
          : emptyPositionIndex + this.state.columns;
      } else {
        nextIndex = emptyIndexHigher
          ? emptyPositionIndex - 1
          : emptyPositionIndex + 1;
      }

      const nextBrick = newList[nextIndex];
      const tempNumber = emptyPosition.number;

      newList[emptyPositionIndex].number = nextBrick.number;
      newList[nextIndex].number = tempNumber;

      this.setState({ bricks: newList }, () => {
        this.setState({ isWinner: this.isWinner() });
      });
    }
  };

  isWinner = () => {
    const hasFaults = this.state.bricks.find((brick, index) => {
      return brick.number !== 0 && brick.number !== index + 1;
    });

    return typeof hasFaults === "undefined" ? true : false;
  };

  render() {
    return (
      <>
        <div
          className={css`
            position: relative;
            background-color: #57737a;
            margin: 0 auto;
            padding: 10px;
            width: ${this.state.columns * 75 + "px"};
            height: ${this.state.rows * 75 + "px"};
            max-width: 90vw;
            max-height: 80vh;

            @media screen and (min-width: 768px) and (orientation: portrait),
              (min-width: 813px) {
              width: ${this.state.columns * 110 + "px"};
              height: ${this.state.rows * 110 + "px"};
              max-width: 80vw;
            }
          `}
        >
          <Grid
            bricks={this.state.bricks}
            columns={this.state.columns}
            rows={this.state.rows}
            onBrickClick={this.moveBricks}
          ></Grid>
        </div>
        <button
          className={css`
            background-color: #000;
            color: #fff;
            font-size: 14px;
            font-family: "Open Sans", "Helvetica", sans-serif;
            font-weight: 700;
            border: none;
            cursor: pointer;
            padding: 15px 30px;
            text-transform: uppercase;
            white-space: nowrap;
            margin-top: 20px;
          `}
          onClick={this.randomizeList}
        >
          New game
        </button>
        {this.state.isWinner && (
          <h3
            className={css`
              position: absolute;
              top: calc(50% - 69px); // 69px is this height of the 'new game'-button + margin
              padding: 20px;
              margin: 0;
              background: rgba(225, 225, 225, 0.85);
              color: #ff8797;
              white-space: nowrap;
            `}
          >
            You did it, well done!
          </h3>
        )}
      </>
    );
  }
}

export default GameContainer;
