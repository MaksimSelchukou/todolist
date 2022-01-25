import React, {useState} from 'react';

import './App.css';
import {FilterValueType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import {Menu} from "@mui/icons-material";

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
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== taskID)})
    }
    const addTask = (valueTask: string, todolistID: string) => {
        let newTask = {id: v1(), title: valueTask.trim(), isDone: false}
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})

    }
    const changeStatus = (taskID: string, isDone: boolean, todolistID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskID ? {...m, isDone: isDone} : m)})
    }

    const changeFilterTask = (value: FilterValueType, todolistID: string) => {
        setTodolists(todolists.map(m => m.id === todolistID ? {...m, filter: value} : m))
    }

    const deleteTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(f => f.id !== todolistID))
        delete tasks[todolistID];
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        let newTodolist: TodolistsType = {id: v1(), title: title, filter: "all"};
        setTodolists([newTodolist, ...todolists])
        setTasks({
            ...tasks,
            [newTodolist.id]: []
        })
    }
    const changeTitleTask = (title: string, todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskID ? {...m, title: title} : m)})
    }

    const changeTitleTodolist = (title: string, todolistID: string) => {
        setTodolists(todolists.map(m => m.id === todolistID ? {...m, title: title} : m))
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
