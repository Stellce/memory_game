import "./main-menu.scss";
import React, {MouseEventHandler, useState} from "react";
import Modal from "../modal/modal.tsx";
import LevelSelector from "../level-selector/level-selector.tsx";
import History from "../history/history.tsx";

const MainMenu = () => {
	const [option, setOption] = useState<string>('');

	const onPlay = () => {
		setOption('Play');
	}
	const onHistory = () => {
		setOption('History');
	}
	const onModalClose: MouseEventHandler<HTMLDivElement> = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();
		setOption('');
	}

	return (
		<>
			<div className="main-menu">
				<img className="bg-image" src="/background-main.jfif" alt=""/>
				<div className="options">
					<button onClick={onPlay}>Play</button>
					<button onClick={onHistory}>History</button>
				</div>
			</div>
			{ option ?
				<Modal onClose={onModalClose}>
					<div className="main-dialog">
						<h3>{option}</h3>
						{
							option === 'Play' ? <span>Difficulty: <LevelSelector/></span> :
							option === 'History' ? <History/> : ''
						}
						<button onClick={() => setOption('')}>Close</button>
					</div>
				</Modal> : ''
			}

		</>
	)
}

export default MainMenu;