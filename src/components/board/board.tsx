import {useGameStore} from "../../store/gameStore.ts";
import './board.scss';
import {Tile} from "../../types/tile.type.ts";
import {levels} from "../../levels.ts";

const Board = () => {
	const tiles = useGameStore(state => state.tiles);
	const revealedTiles = useGameStore(state => state.revealedTiles);
	const revealTile = useGameStore(state => state.revealTile);
	const matchedPairs = useGameStore(state => state.matchedPairs);
	const levelName = useGameStore(state => state.levelName);

	const onTileClick = (tile: Tile) => {
		revealTile(tile.id);
	}

	const level = levels.find(l => l.name === levelName)!;

	return (
		<div className="game-board">
			{tiles.map((tile) => {
				const revealed = revealedTiles.includes(tile.id) || matchedPairs.includes(tile.id);
				return (
					<div
						key={tile.id}
						className="tile"
						data-revealed={revealed}
						onClick={() => onTileClick(tile)}
					>
						{revealed ? tile.image : "❓"}
					</div>
				)
			})}
			<img src={level.backgroundPath} alt="" className="bg-level-image"/>
		</div>
	);
};

export default Board;
