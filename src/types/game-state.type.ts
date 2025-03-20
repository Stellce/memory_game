import {Tile} from "./tile.type.ts";
import {SavedGame} from "./saved-game.type.ts";

export type GameState = {
	tiles: Tile[];
	revealedTiles: number[];
	matchedPairs: number[];
	levelName: string;
	attempts: number;
	duration: number;
	startTime: number;
	endTime: number;
	setTiles: (tiles: GameState["tiles"]) => void;
	revealTile: (id: GameState["tiles"][0]["id"]) => void;
	hideTiles: (n?: number[]) => void;
	setDuration: (duration: number) => void;
	resetGame: () => void;
	increaseAttempt: () => void;
	endGame: () => void;
	loadHistory: () => SavedGame[];
	setLevel: (level: string) => void;
};