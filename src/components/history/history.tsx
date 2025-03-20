import {useGameStore} from "../../store/gameStore.ts";
import "./history.scss";

const History = () => {
	const loadHistory = useGameStore(state => state.loadHistory);
	const history = loadHistory().reverse();

	return history.length ? (
		<div className="save-list">
			{history.map((game, index) =>
				<div className="save" key={index}>
					attempts: {game.attempts} | duration: {game.duration} | date: {new Date(game.date).toLocaleString()}
				</div>
			)}
		</div>
	) : (
		<>
			You do not have any saved games yet!
		</>
	)
}

export default History;