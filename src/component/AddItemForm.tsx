import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	//	id: string
	//	title: string
	//	todolistId: string
	//removeTask: (todolistId: string, id: string) => void
	//	changeFilter: (todolistId: string, value: FilterValuesType) => void
	callback: (title: string) => void
	//	changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
}

export function AddItemForm(props: PropsType) {

	let [title, setTitle] = useState("")
	let [error, setError] = useState<string | null>(null)

	const addTask = () => {
		if (title.trim() !== "") {
			props.callback(title.trim());
			setTitle("");
		} else {
			setError("Title is required");
		}
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null);
		if (e.charCode === 13) {
			addTask();
		}
	}

	return <div>

		<div>
			<input value={title}
				onChange={onChangeHandler}
				onKeyPress={onKeyPressHandler}
				className={error ? "error" : ""}
			/>
			<button onClick={addTask}>+</button>
			{error && <div className="error-message">{error}</div>}
		</div>

	</div>
}
