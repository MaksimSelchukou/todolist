import React, {useState} from 'react';

import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {


    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])

    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(f => f.id !== taskID))
    }
    const addTask = (valueTask: string) => {
        let newTask = {id: 4, title: valueTask.trim(), isDone: false}
        setTasks([newTask, ...tasks])
    }
    const changeStatus = (taskID: number, isDone: boolean) => {
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
