import React, { useState } from 'react';
import './App.css';
import Todolist, { TaskType } from './Todolist';

export type FilterValuesType = "all" | "active" | "completed"

function App() {


    let [tasks, setStasks] = useState<Array<TaskType>>([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ])

    let [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTaks(id: number) {
        let resultTasks = tasks.filter(t => t.id !== id)
        setStasks(resultTasks)
    }
    function changeFilter(value: FilterValuesType) {
        setFilter(value)

    }
    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTaks={removeTaks}
                changeFilter={changeFilter} />

        </div>
    );
}

export default App;
