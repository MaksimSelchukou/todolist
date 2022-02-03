import React, {useReducer} from 'react';
import './App.css';
import {FilterValueType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Typography} from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

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

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispathTodolists] = useReducer(todolistsReducer,[
        {id: todolistId1, title: "What to buy", filter: "all"},
        {id: todolistId2, title: "What to learn", filter: "all"}
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer,{
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
        const action = removeTaskAC(taskID,todolistID)
        dispatchTasks(action)
    }
    const addTask = (valueTask: string, todolistID: string) => {
        const action = addTaskAC(valueTask,todolistID)
        dispatchTasks(action)
    }
    const changeStatus = (taskID: string, isDone: boolean, todolistID: string) => {
        const action = changeStatusTaskAC(taskID,isDone,todolistID)
        dispatchTasks(action)
    }

    const changeFilterTask = (value: FilterValueType, todolistID: string) => {
        dispathTodolists(changeFilterTodolistAC(value,todolistID))
    }

    const deleteTodolist = (todolistID: string) => {
        const action = removeTodolistAC(todolistID)
        dispathTodolists(action)
        dispatchTasks(action)
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispathTodolists(action)
        dispatchTasks(action)
    }
    const changeTitleTask = (title: string, todolistID: string, taskID: string) => {
        const action = changeTitleTaskAC(title,todolistID,taskID)
        dispatchTasks(action)
    }

    const changeTitleTodolist = (title: string, todolistID: string) => {
        const action = changeTitleTodolistAC(title,todolistID)
        dispathTodolists(action)
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Menu/>
                    </IconButton>
                    <Typography>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:"20px"}}>
                    <AddItemForm todolistID={todolistId2} addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolists.map(todo => {
                        return (
                            <Grid item>
                                <Paper style={{padding:"10px"}}>
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
