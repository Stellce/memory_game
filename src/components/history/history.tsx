import {useGameStore} from "../../store/gameStore.ts";
import "./history.scss";
import {levels} from "../../levels.ts";

const History = () => {
	const loadHistory = useGameStore(state => state.loadHistory);
	const history = loadHistory().reverse();

	return history.length ? (
		<div className="save-list">
			{history.map((game, index) => {
				const level = levels.find(l => l.name === game.level)!;
				console.log('level', level);
				return (
					<div className="save" key={index}>
						<img src={level?.backgroundPath || ''} alt=""/>
						<div className="data">
							<h4>Level: {game.level}</h4>
							<div>
								Duration: {game.duration} seconds
							</div>
							<div className="align-end">{new Date(game.date).toLocaleString()}</div>
							<div>Attempts: {game.attempts}</div>
						</div>
					</div>
				)
			})}
		</div>
	) : (
		<>
			You do not have any saved games yet!
		</>
	)
}

export default History;