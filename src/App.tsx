import React, { useState } from 'react';
import './App.css';
import Todolist, { TaskType } from './Todolist';
import { v1 } from 'uuid';


export type FilterValuesType = "all" | "active" | "completed"
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
function App() {


    let [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false }
    ])

    //let [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTaks(id: string) {
        let resultTasks = tasks.filter(t => t.id !== id)
        setTasks(resultTasks)
    }
    function addTask(title: string) {
        let newTask = { id: v1(), title: title, isDone: false }
        setTasks([newTask, ...tasks])
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks])

    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        // setFilter(value)
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }

    }


    let [todolists, setTodolists] = useState<Array<TodoListType>>([
        { id: v1(), title: "What to leran", filter: "active" },
        { id: v1(), title: "What to buy", filter: "all" },
    ])

    return (
        <div className="App">
            {todolists.map((tl) => {
                let tasksForTodolist = tasks
                if (tl.filter === 'active') {
                    tasksForTodolist = tasks.filter(t => t.isDone === true)
                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasks.filter(t => t.isDone === false)
                }
                return <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTaks={removeTaks}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter} />
            })}


        </div>
    );
}

export default App;
