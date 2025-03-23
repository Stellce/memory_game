import {useGameStore} from "../../store/gameStore.ts";
import "./level-selector.scss";
import {ChangeEvent, ChangeEventHandler} from "react";
import {Tile} from "../../types/tile.type.ts";
import {Level} from "../../types/level.type.ts";
import {levels} from "../../levels.ts";

type Props = {
	onClose?: () => void
}

const LevelSelector = (props: Props) => {
	const setTiles = useGameStore(state => state.setTiles);
	const resetGame = useGameStore(state => state.resetGame);
	const level = useGameStore(state => state.levelName);
	const setLevel = useGameStore(state => state.setLevel);

	const selectLevel = (level: Level) => {
		const images = getRandomEmojis(level.numOfTiles);
		const tiles: Tile[] = [...images, ...images]
			.map((image, id) => ({id, image}));
		setTiles(tiles);
		setLevel(level.name);
		resetGame();
	}

	const onLevelSelectorChange: ChangeEventHandler<HTMLSelectElement> = (e: ChangeEvent<HTMLSelectElement>) => {
		const levelId: number = +e.target.value;
		selectLevel(levels[levelId]);
		if (props.onClose) props.onClose();
	}

	const getRandomEmojis = (n: number) => {
		const startCode = 127789;
		const endCode = 127861;
		let emojiCodes = Array.from({length: endCode - startCode - 1}, (_, i) => startCode + i);
		const emojis = [];

		for (let i = 1; i <= n; i++) {
			const randomIndex = Math.floor(Math.random() * emojiCodes.length);
			const randomCode = emojiCodes[randomIndex];
			emojiCodes = emojiCodes.filter(ec => ec !== randomCode);
			const emoji = String.fromCodePoint(Number("0x" + (randomCode).toString(16)));
			emojis.push(emoji);
		}
		return emojis;
	}

	return (
		<select className="level-selector" onChange={onLevelSelectorChange} defaultValue={level}>
			<option value="" hidden>Select level</option>
			{
				levels.map((level, i) =>
					<option className="level" key={i} value={i} onClick={() => selectLevel(level)}>{level.name}</option>
				)
			}
		</select>
	)
}

export default LevelSelector;