import React from 'react';
import { css } from 'emotion';
import GameContainer from './components/GameContainer';

function App() {
  return (
    <div
      className={css`
        position: relative;
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}>
      <GameContainer></GameContainer>
    </div>
  );
}

export default App;
