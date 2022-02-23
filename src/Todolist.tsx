import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { FilterValuesType } from './App';
import './App.css';
export type TaskType = {
	id: string
	title: string
	isDone: boolean
}
type PropsType = {
	id: string
	title: string
	tasks: Array<TaskType>
	removeTaks: (tasksId: string) => void
	changeFilter: (value: FilterValuesType, todolistId: string) => void
	addTask: (title: string) => void
	changeTaskStatus: (taskId: string, isDone: boolean) => void
	filter: FilterValuesType
}
function Todolist(props: PropsType) {

	const [newTaksTitle, setNewTakTitile] = useState<string>("")
	const [error, setError] = useState<boolean>(false)


	const addTask = () => {
		console.log(newTaksTitle)
		if (newTaksTitle.trim() !== "") {
			props.addTask(newTaksTitle.trim());
			setNewTakTitile("")
		} else {
			setError(true)
		}
	}
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTakTitile(e.currentTarget.value)
		setError(false)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		e.key === "Enter" && addTask();


	}
	const onClickFilterHandler = (value: FilterValuesType, todolistId: string) => {
		props.changeFilter(value, props.id)
	}

	const onClickRemoveHandler = (id: string) => {
		props.removeTaks(id)
	}

	return <div>
		<h3>{props.title}</h3>

		<div>
			<input value={newTaksTitle}
				onChange={onChangeHandler}
				onKeyPress={onKeyPressHandler}
				className={error ? "error" : ""} />
			<button onClick={addTask}>+</button>
			{error ? <div className='error-message'> Fiend is required</div> : ""}
		</div>
		<ul>
			{
				props.tasks.length ?
					props.tasks.map((t) => {
						const onChangeHandlerInput = (e: ChangeEvent<HTMLInputElement>) => {
							props.changeTaskStatus(t.id, e.currentTarget.checked)
						}
						return <li key={t.id} className={t.isDone ? "is-done" : ""}>
							<input type="checkbox" checked={t.isDone} onChange={onChangeHandlerInput} />
							<span>{t.title}</span>
							<button onClick={() => onClickRemoveHandler(t.id)}> X </button>

						</li>

					}) :
					<span> list empty</span>
			}

		</ul>
		<div>
			<button className={props.filter === "all" ? "active-filter" : ""}
				onClick={() => onClickFilterHandler("all", props.id)}>All</button>
			<button className={props.filter === "active" ? "active-filter" : ""}
				onClick={() => onClickFilterHandler("active", props.id)}>Active</button>
			<button className={props.filter === "completed" ? "active-filter" : ""}
				onClick={() => onClickFilterHandler("completed", props.id)}>Completed</button>
		</div>
	</div>
}

export default Todolist;