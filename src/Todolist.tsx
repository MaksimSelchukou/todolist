import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {TaskType} from "./App";

type TodolistType = {
    tasks: Array<TaskType>
    title: string
    removeTask: (taskID: number) => void
    addTask: (valueTask: string) => void
    changeStatus: (taskID: number, isDone: boolean) => void
}
type FilterValueType = "all" | "active" | "completed"


export const Todolist = (props: TodolistType) => {

    const [filter, setFilter] = useState<FilterValueType>("all")
    let [error, setError] = useState<string | null>(null)

    const changeFilterTask = (value: FilterValueType) => {
        setFilter(value)
    }
    let filteredTasks = props.tasks
    if (filter === "active") {
        filteredTasks = props.tasks.filter(f => !f.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = props.tasks.filter((f => f.isDone))
    }


    const onClickDeleteTaskHandler = (taskID: number) => {
        props.removeTask(taskID)
    }

    const [valueInput, setValueInput] = useState('')

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setValueInput(event.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (valueInput.trim() !== "") {
            props.addTask(valueInput)
            setValueInput('')
        } else {
            setError('Ошибка')
        }
    }

    const enterAddHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (valueInput.trim() !== "") {
                props.addTask(valueInput)
                setValueInput('')
            } else {
                setError('Ошибка')
            }
        }
    }

    const onChangeStatusHandler = (taskID: number, event: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(taskID, event.currentTarget.checked)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input onKeyPress={enterAddHandler} value={valueInput} onChange={onChangeInput}
                       className={error ? "error" : ""}/>
                <button onClick={addTaskHandler}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {filteredTasks.map(t => <li key={t.id}>
                    <input type="checkbox" onChange={(e) => onChangeStatusHandler(t.id, e)} checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => onClickDeleteTaskHandler(t.id)}>x</button>
                </li>)}
            </ul>
            <div>
                {/*<button onClick={() => changeFilterTask("all")}>ALL</button>*/}
                {/*<button onClick={() => changeFilterTask("active")}>Active</button>*/}
                {/*<button onClick={() => changeFilterTask("completed")}>Completed</button>*/}
                <button onClick={() => changeFilterTask("all")}>ALL</button>
                <button onClick={() => changeFilterTask("active")}>Active</button>
                <button onClick={() => changeFilterTask("completed")}>Completed</button>
            </div>
        </div>
    );
};

