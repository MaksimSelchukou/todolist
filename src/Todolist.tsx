import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {TaskStateType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox} from "@mui/material";
import {Delete} from "@mui/icons-material";


//Типизация Тудулиста
type TodolistType = {
    // tasks: Array<TaskType>
    tasks: TaskStateType
    title: string
    removeTask: (taskID: string, todolistID: string) => void
    addTask: (valueTask: string, todolistID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    todolistID: string
    filter: FilterValueType
    changeFilterTask: (value: FilterValueType, todolistID: string) => void
    deleteTodolist: (todolistID: string) => void
    changeTitleTask: (title: string,todolistID: string,taskID:string) => void
    changeTitleTodolist:(title: string,todolistID: string)=>void
}
export type FilterValueType = "all" | "active" | "completed"


export const Todolist = (props: TodolistType) => {

    //Фильтрация тасок
    // const changeFilterTaskHandler = (value: FilterValueType, TodoID: string) => {
    //     props.changeFilterTask(value, TodoID)
    // }


    const changeFilterTaskCompletedHandler = () => {props.changeFilterTask('completed', props.todolistID)}
    const changeFilterTaskActiveHandler = () => {props.changeFilterTask('active', props.todolistID)}
    const changeFilterTaskAllHandler = () => {props.changeFilterTask('all', props.todolistID)}


    let filteredTasks = props.tasks[props.todolistID]
    if (props.filter === "active") {
        filteredTasks = filteredTasks.filter(f => !f.isDone)
    }
    if (props.filter === 'completed') {
        filteredTasks = filteredTasks.filter((f => f.isDone))
    }

    //Обработчики событий
    const onClickDeleteTaskHandler = (taskID: string, todolistID: string) => {
        props.removeTask(taskID, todolistID)
    }

    const onChangeStatusHandler = (taskID: string, event: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(taskID, event.currentTarget.checked, props.todolistID)
    }

    const deleteTodolistHandler = () => {
        props.deleteTodolist(props.todolistID)
    }
    const addTaskHandler = (title: string) => {
        props.addTask(title, props.todolistID)
    }

    const changeTitleTaskHandler = (newValue: string,taskID:string) => {
        props.changeTitleTask(newValue,props.todolistID,taskID)
    }

    const changeTitleTodolistHandler = (newValue:string) =>{
        props.changeTitleTodolist(newValue,props.todolistID)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTitleTodolistHandler}/>
                {/*<button onClick={deleteTodolistHandler}>del</button>*/}
                <Button onClick={deleteTodolistHandler}>del</Button>
            </h3>

            <div>
                <AddItemForm addItem={addTaskHandler} todolistID={props.todolistID}/>
                {/*<input onKeyPress={enterAddHandler} value={valueInput} onChange={onChangeInputHandler}*/}
                {/*       className={error ? "error" : ""}/>*/}
                {/*<button onClick={addTaskHandler}>+</button>*/}
                {/*{error && <div className="error-message">{error}</div>}*/}
            </div>
            <ul>
                {filteredTasks.map(t => <li key={t.id} className={t.isDone ? "is-done" : ""}>
                    <Checkbox onChange={(e) => onChangeStatusHandler(t.id, e)} checked={t.isDone}/>
                    {/*<span>{t.title}</span>*/}
                    <EditableSpan onChange={(newValue)=>changeTitleTaskHandler(newValue,t.id)} title={t.title}/>
                    <Button size={'small'} onClick={() => onClickDeleteTaskHandler(t.id, props.todolistID)}><Delete/></Button>
                </li>)}
            </ul>
            <div>
                <Button size={"small"}  variant={props.filter === "all" ? 'contained' : 'text'}
                        onClick={changeFilterTaskAllHandler}>ALL</Button>
                {/*<Button className={props.filter === "active" ? 'active-filter' : ''}*/}
                {/*        onClick={() => changeFilterTaskHandler("active", props.todolistID)}>Active*/}
                {/*</Button>*/}
                <Button size={"small"}  variant={props.filter === "active" ? 'contained' : 'text'}
                        onClick={changeFilterTaskActiveHandler}>Active
                </Button>
                {/*<Button color={'secondary'} className={props.filter === "completed" ? 'active-filter' : ''}*/}
                {/*        onClick={() => changeFilterTaskHandler("completed", props.todolistID)}>Completed*/}
                {/*</Button>*/}
                <Button size={"small"} color={'secondary'} variant={props.filter === "completed" ? 'contained' : 'text'}
                        onClick={changeFilterTaskCompletedHandler}>Completed
                </Button>
            </div>
        </div>
    );
};

