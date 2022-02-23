import React from 'react';
type TaskType = {
	id: string
	title: string
	isDone: boolean
	removeTask: (taskId: string) => void
}

const Task = (props: TaskType) => {
	return (
		<li >
			<input type="checkbox" checked={props.isDone} />
			<span className={props.isDone ? "complited-task" : ""}>{props.title}</span>
			<button onClick={() => props.removeTask(props.id)}> X </button>
		</li>
	)

}

export default Task;