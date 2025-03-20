import {MouseEventHandler, ReactNode} from "react";
import "./modal.scss";

type Props = {
	children: ReactNode;
	onClose?: MouseEventHandler<HTMLDivElement>;
}

const Modal = (props: Props) => {


	return (
		<>
			<div className="overlay" onClick={props.onClose}>
				<div className="dialog" onClick={e => e.stopPropagation()}>
					{props.children}
				</div>
			</div>
		</>
	)
}
export default Modal;