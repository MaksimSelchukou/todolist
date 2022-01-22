import React, {useState} from 'react';

import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {


    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(f => f.id !== taskID))
    }
    const addTask = (valueTask: string) => {
        let newTask = {id: v1(), title: valueTask.trim(), isDone: false}
        setTasks([newTask, ...tasks])
    }
    const changeStatus = (taskID: string, isDone: boolean) => {
        setTasks([...tasks.map(m=>m.id === taskID ? {...m,isDone:isDone}:m)])
    }


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks}
                removeTask={removeTask}
                addTask={addTask}
                changeStatus={changeStatus}

            />
        </div>
    );
}

export default App;
