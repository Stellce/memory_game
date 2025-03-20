import {useGameStore} from "../../store/gameStore.ts";
import "./stats.scss";
import {useEffect} from "react";

const Stats = () => {
	const startTime = useGameStore(state => state.startTime);
	const attempts = useGameStore(state => state.attempts);
	const duration = useGameStore(state => state.duration);
	const setDuration = useGameStore(state => state.setDuration);

	useEffect(() => {
		setDuration(0);
		const interval = setInterval(() => {
			const duration = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
			setDuration(duration);
		}, 1000);
		return () => clearInterval(interval);
	}, [startTime]);

	return (
		<div className="stats">
			<p>Attempts: { attempts }</p>
			<p>Time: { duration }s</p>
		</div>
	);
};

export default Stats;
