import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './component/AddItemForm';

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodoListType>>([
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "Rest API", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: "HTML", isDone: true },
            { id: v1(), title: "JS2", isDone: true },
            { id: v1(), title: "ReactJS2", isDone: false },
            { id: v1(), title: "Rest API2", isDone: false },
            { id: v1(), title: "GraphQL2", isDone: false },
        ]
    });

    //   let [filter, setFilter] = useState<FilterValuesType>("all");

    const updateTask = (todolistId: string, taskId: string, updateTitle: string) => {
        //setTasks({...tasks, [todolistId]: [...]})

        console.log(todolistId, taskId, updateTitle)

    }
    function removeTask(todolistId: string, id: string) {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id) })
        //    let filteredTasks = tasks.filter(t => t.id != id);
        //     setTasks(filteredTasks);
    }

    function addTask(todolistId: string, title: string) {
        let task = { id: v1(), title: title, isDone: false };
        ////     let newTasks = [task, ...tasks];
        //      setTasks(newTasks);
        setTasks({ ...tasks, [todolistId]: [task, ...tasks[todolistId]] })
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        //      let task = tasks.find(t => t.id === taskId);
        //       if (task) {
        //          task.isDone = isDone;
        //      }

        //     setTasks([...tasks]);
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? { ...t, isDone } : t) })

    }


    function changeFilter(todolistId: string, value: FilterValuesType) {
        //    setFilter(value);
        setTodolists(todolists.map(el => el.id === todolistId ? { ...el, filter: value } : el))
    }
    const addTodolist = (newtitle: string) => {
        const newId = v1()
        let newTodolist: TodoListType = { id: newId, title: newtitle, filter: 'all' }
        setTodolists([newTodolist, ...todolists])
        setTasks({ ...tasks, [newId]: [] })
    }

    return (
        <div className="App">
            <AddItemForm callback={addTodolist} />

            {todolists.map(tl => {

                let tasksForTodolist = tasks[tl.id];


                if (tl.filter === "active") {
                    tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
                }


                return <Todolist key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                    updateTask={updateTask}
                />
            })

            }

        </div>
    );
}

export default App;
