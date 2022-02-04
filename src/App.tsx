import React, {useCallback} from 'react';
import './App.css';
import {FilterValueType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Typography} from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {appStoreType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {
    console.log('App is called')

    const dispatch = useDispatch()
    const todolists = useSelector<appStoreType, Array<TodolistsType>>(state => state.todolists)
    const tasks = useSelector<appStoreType, TaskStateType>(state => state.tasks)


    const removeTask =useCallback( (taskID: string, todolistID: string) => {
        const action = removeTaskAC(taskID, todolistID)
        dispatch(action)
    },[])
    const addTask =useCallback( (valueTask: string, todolistID: string) => {
        const action = addTaskAC(valueTask, todolistID)
        dispatch(action)
    },[])
    const changeStatus =useCallback( (taskID: string, isDone: boolean, todolistID: string) => {
        const action = changeStatusTaskAC(taskID, isDone, todolistID)
        dispatch(action)
    },[])

    const changeFilterTask = useCallback((value: FilterValueType, todolistID: string) => {
        dispatch(changeFilterTodolistAC(value, todolistID))
    },[])

    const deleteTodolist =useCallback( (todolistID: string) => {
        const action = removeTodolistAC(todolistID)
        dispatch(action)
    },[])

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [])

    const changeTitleTask = useCallback ((title: string, todolistID: string, taskID: string) => {
        const action = changeTitleTaskAC(title, todolistID, taskID)
        dispatch(action)
    },[])

    const changeTitleTodolist = useCallback( (title: string, todolistID: string) => {
        const action = changeTitleTodolistAC(title, todolistID)
        dispatch(action)
    },[])


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <div style={{padding: "20px"}}>{'Новый тудулист'}</div>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolists.map(todo => {
                        return (
                            <Grid item key={todo.id}>
                                <Paper style={{padding: "10px"}}>
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
                                        deleteTodolist={deleteTodolist}
                                        changeTitleTask={changeTitleTask}
                                        changeTitleTodolist={changeTitleTodolist}
                                    />
                                </Paper>
                            </Grid>

                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}


export default App;
