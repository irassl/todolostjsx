import React from 'react';


type PropsType = {
	title: string
}

export const ModalWindow: React.FC<PropsType> = (props) => {
	return (
		<div>
			<input type='text' />
			<input type='text' />
			<div>
				<button>Yes</button>
				<button>No</button>
			</div>
		</div>
	)
}