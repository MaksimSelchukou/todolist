import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {TaskType} from "./App";

//Типизация Тудулиста
type TodolistType = {
    tasks: Array<TaskType>
    title: string
    removeTask: (taskID: string) => void
    addTask: (valueTask: string) => void
    changeStatus: (taskID: string, isDone: boolean) => void
}
type FilterValueType = "all" | "active" | "completed"


export const Todolist = (props: TodolistType) => {

    //UseStates
    const [filter, setFilter] = useState<FilterValueType>("all")
    let [error, setError] = useState<string | null>(null)
    const [valueInput, setValueInput] = useState('')


    //Фильтрация тасок
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

    //Обработчики событий
    const onClickDeleteTaskHandler = (taskID: string) => {
        props.removeTask(taskID)
    }
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError('')
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
    const onChangeStatusHandler = (taskID: string, event: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(taskID, event.currentTarget.checked)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input onKeyPress={enterAddHandler} value={valueInput} onChange={onChangeInputHandler}
                       className={error ? "error" : ""}/>
                <button onClick={addTaskHandler}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {filteredTasks.map(t => <li key={t.id} className={t.isDone ? "is-done" : ""}>
                    <input type="checkbox" onChange={(e) => onChangeStatusHandler(t.id, e)} checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => onClickDeleteTaskHandler(t.id)}>x</button>
                </li>)}
            </ul>
            <div>
                <button className={filter === "all" ? 'active-filter' : ''}
                        onClick={() => changeFilterTask("all")}>ALL
                </button>
                <button className={filter === "active" ? 'active-filter' : ''}
                        onClick={() => changeFilterTask("active")}>Active
                </button>
                <button className={filter === "completed" ? 'active-filter' : ''}
                        onClick={() => changeFilterTask("completed")}>Completed
                </button>
            </div>
        </div>
    );
};

