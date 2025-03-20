import {create} from "zustand/react";
import {GameState} from "../types/game-state.type.ts";
import {SavedGame} from "../types/saved-game.type.ts";

export const useGameStore = create<GameState>((set) => ({
	tiles: [],
	revealedTiles: [],
	matchedPairs: [],
	levelName: "",
	attempts: 0,
	duration: 0,
	startTime: 0,
	endTime: 0,
	setTiles: (tiles) => set({ tiles }),
	revealTile: (id) =>
		set((state) => {
			const currentTile = state.tiles.find(t => t.id === id);
			if (!currentTile || state.matchedPairs.includes(currentTile.id) || state.revealedTiles.includes(currentTile.id)) return {};

			if (state.revealedTiles.length === 2) return ({revealedTiles: [id]});

			const previousTile = state.tiles.find(t => t.id === state.revealedTiles[0]);
			if (previousTile) {
				state.increaseAttempt();
				if (previousTile?.image === currentTile.image) {
					if (state.matchedPairs.length === state.tiles.length - 2) {
						setTimeout(state.endGame, 100);
					} else {
						return ({matchedPairs: [...state.matchedPairs, ...state.revealedTiles, id], revealedTiles: []});
					}
				}
				setTimeout(() => state.hideTiles([...state.revealedTiles, id]), 1000);
			}
			return ({revealedTiles: [...state.revealedTiles, id]});
		}),
	hideTiles: (n) =>
		set(state => {
			return {revealedTiles: state.revealedTiles.filter(tId => !n?.includes(tId))};
		}),
	setDuration: (duration) => set({ duration }),
	resetGame: () =>
		set((state) => {
			const tiles = state.tiles.sort(() => Math.random() - 0.5);
			return { tiles, attempts: 0, startTime: Date.now(), matchedPairs: [], revealedTiles: [], endTime: 0 }
		}),
	increaseAttempt: () => set(state => ({ attempts: state.attempts += 1 })),
	endGame: () => set(state => {
		const savedGame: SavedGame = {
			attempts: state.attempts,
			duration: state.duration,
			date: Date.now(),
			level: state.levelName
		}
		const history = state.loadHistory();
		history.push(savedGame);
		localStorage.setItem("game-history", JSON.stringify(history));
		return { tiles: [], endTime: Date.now() }
	}),
	loadHistory: (): SavedGame[] => JSON.parse(localStorage.getItem("game-history") || '[]'),
	setLevel: (levelName) => set({levelName})
}));