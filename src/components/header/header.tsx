import Stats from "../stats/stats.tsx";
import LevelSelector from "../level-selector/level-selector.tsx";
import {useGameStore} from "../../store/gameStore.ts";
import "./header.scss";
import {useState} from "react";
import Modal from "../modal/modal.tsx";

const Header = () => {
	const resetGame = useGameStore(state => state.resetGame);
	const tiles = useGameStore(state => state.tiles);
	const setTiles = useGameStore(state => state.setTiles);
	const [openSettings, setOpenSettings] = useState<boolean>(false);

	const onRestart = () => {
		resetGame();
		setOpenSettings(false);
	}

	const toMainMenu = () => {
		setTiles([]);
		setOpenSettings(false);
	}

	return (
		<header className="app-header">
			{ tiles.length ?
				<>
          <object type="image/svg+xml" data="MG.svg" className="logo">Logo</object>
          <Stats/>
          <button className="settings-btn" onClick={() => setOpenSettings(!openSettings)}>⚙️</button>
					{ openSettings ?
						<Modal onClose={() => setOpenSettings(false)}>
              <div className="settings">
                <h3>Settings ⚙️</h3>
                <span>Difficulty: <LevelSelector onClose={() => setOpenSettings(false)}/></span>
                <button onClick={onRestart}>Restart</button>
                <button onClick={toMainMenu}>To Main Menu</button>
                <button onClick={() => setOpenSettings(false)}>Close</button>
              </div>
            </Modal> : ''
					}
        </> : ''
			}
		</header>
	)
}

export default Header;