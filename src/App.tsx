import React, {useState} from 'react';

import './App.css';
import {FilterValueType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistId1, title: "What to buy", filter: "all"},
        {id: todolistId2, title: "What to learn", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
            [todolistId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
            [todolistId2]: [
                {id: v1(), title: "HTML&CSS", isDone: false},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ]
        }
    );


    const removeTask = (taskID: string, todolistID: string) => {
        // setTasks(tasks.filter(f => f.id !== taskID))
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== taskID)})
    }
    const addTask = (valueTask: string, todolistID: string) => {
        let newTask = {id: v1(), title: valueTask.trim(), isDone: false}
        // setTasks([newTask, ...tasks])
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})

    }
    const changeStatus = (taskID: string, isDone: boolean, todolistID: string) => {
        // setTasks([...tasks.map(m=>m.id === taskID ? {...m,isDone:isDone}:m)])
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskID ? {...m, isDone: isDone} : m)})
    }

    const changeFilterTask = (value: FilterValueType, todolistID: string) => {
        setTodolists(todolists.map(m => m.id === todolistID ? {...m, filter: value} : m))
        // setTodolists(todolists.map(m => m.id === TodoID ? {...m, filter: value} : m))
    }


    return (
        <div className="App">
            {todolists.map(todo => {
                return (
                    <Todolist
                        key={todo.id}
                        todolistID={todo.id}
                        title={todo.title}
                        tasks={tasks}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={todo.filter}
                        changeFilterTask={changeFilterTask}

                    />
                )
            })}

        </div>
    );
}

export default App;
