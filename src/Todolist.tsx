import React, {ChangeEvent, useCallback} from 'react';
import {TaskStateType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button} from "@mui/material";
import {Task} from "./Task";


//Типизация Тудулиста
type TodolistType = {
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


export const Todolist = React.memo((props: TodolistType) => {
    console.log('Todolist is called')


    const changeFilterTaskCompletedHandler = useCallback(() => {props.changeFilterTask('completed', props.todolistID)},[props.changeFilterTask,props.todolistID])
    const changeFilterTaskActiveHandler =useCallback (() => {props.changeFilterTask('active', props.todolistID)},[props.changeFilterTask,props.todolistID])
    const changeFilterTaskAllHandler =useCallback (() => {props.changeFilterTask('all', props.todolistID)},[props.changeFilterTask,props.todolistID])


    let filteredTasks = props.tasks[props.todolistID]
    if (props.filter === "active") {
        filteredTasks = filteredTasks.filter(f => !f.isDone)
    }
    if (props.filter === 'completed') {
        filteredTasks = filteredTasks.filter((f => f.isDone))
    }

    //Обработчики событий
    const onClickDeleteTaskHandler = useCallback((taskID: string, todolistID: string) => {
        props.removeTask(taskID, todolistID)
    },[])

    const onChangeStatusHandler = useCallback((taskID: string, event: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(taskID, event.currentTarget.checked, props.todolistID)
    },[])

    const deleteTodolistHandler = useCallback (() => {
        props.deleteTodolist(props.todolistID)
    },[])

    const addTaskHandler = useCallback((title: string) => {
        props.addTask(title, props.todolistID)
    },[])

    const changeTitleTaskHandler = useCallback ((newValue: string,taskID:string) => {
        props.changeTitleTask(newValue,props.todolistID,taskID)
    },[])

    const changeTitleTodolistHandler = useCallback ((newValue:string) =>{
        props.changeTitleTodolist(newValue,props.todolistID)
    },[])

    return (
        <div>
            <h3>

                <EditableSpan title={props.title} onChange={changeTitleTodolistHandler}/>

                <Button onClick={deleteTodolistHandler}>del</Button>
            </h3>

            <div>
                <AddItemForm addItem={addTaskHandler} />
            </div>

            <ul>
                {filteredTasks.map(t =><Task
                                             key={t.id}
                                             t={t}
                                             onClickDeleteTaskHandler={onClickDeleteTaskHandler}
                                             todolistID={props.todolistID}
                                             onChangeStatusHandler={onChangeStatusHandler}
                                             changeTitleTaskHandler={changeTitleTaskHandler}/> )}
            </ul>
            <div>
                <Button size={"small"}  variant={props.filter === "all" ? 'contained' : 'text'}
                        onClick={changeFilterTaskAllHandler}>ALL</Button>
                <Button size={"small"}  variant={props.filter === "active" ? 'contained' : 'text'}
                        onClick={changeFilterTaskActiveHandler}>Active
                </Button>
                <Button size={"small"} color={'secondary'} variant={props.filter === "completed" ? 'contained' : 'text'}
                        onClick={changeFilterTaskCompletedHandler}>Completed
                </Button>
            </div>
        </div>
    );
});

