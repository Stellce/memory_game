import './App.scss'
import Board from "./components/board/board.tsx";
import {useGameStore} from "./store/gameStore.ts";
import MainMenu from "./components/main-menu/main-menu.tsx";
import Header from "./components/header/header.tsx";
import Modal from "./components/modal/modal.tsx";

const App = () => {
  const tiles = useGameStore(state => state.tiles);
  const startTime = useGameStore(state => state.startTime);
  const endTime = useGameStore(state => state.endTime);
  const attempts = useGameStore(state => state.attempts);
  const resetGame = useGameStore(state => state.resetGame);
  const time = startTime ? Math.floor((endTime - startTime) / 1000) : 0;

  const onCloseModal = () => {
    resetGame();
  }

  return (
    <>
      <Header/>
      { tiles.length ?
        <Board/> : <MainMenu/>
      }
      { endTime ?
        <Modal onClose={onCloseModal}>
          <h3>Game end! Congratulations!</h3>
          <p>
            Your attempts number: { attempts }<br/>
            Time: { time } seconds
          </p>
          <button onClick={onCloseModal}>Ok</button>
        </Modal> : ''
      }
    </>
  )
}

export default App
