import {v1} from "uuid";
import {
    addTodolist,
    changeFilterTodolist,
    changeTitleTodolist,
    removeTodolist,
    todolistsReducer
} from "./todolists-reducer";
import {TodolistsType} from "../App";

test.skip('correct todolists should be added', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const newTodolistTitle = 'New Todolist'

    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: "What to buy", filter: "all"},
        {id: todolistId2, title: "What to learn", filter: "all"},
    ]

    const endState = todolistsReducer(startState,addTodolist(newTodolistTitle))

    expect(endState.length).toBe(3)
});

test.skip('correct todolists should be removed', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();


    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: "What to buy", filter: "all"},
        {id: todolistId2, title: "What to learn", filter: "all"},
    ]

    const endState = todolistsReducer(startState,removeTodolist(todolistId1))

    expect(endState.length).toBe(1)
});

test.skip('correct title of todolists should ba changed', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const newTitle = 'NEWWW';


    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: "What to buy", filter: "all"},
        {id: todolistId2, title: "What to learn", filter: "all"},
    ]


    const endState = todolistsReducer(startState,changeTitleTodolist(todolistId1,newTitle))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(newTitle)
});

test.skip('correct filter of todolists should ba changed', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: "What to buy", filter: "all"},
        {id: todolistId2, title: "What to learn", filter: "all"},
    ]

    const endState = todolistsReducer(startState,changeFilterTodolist(todolistId1,"active"))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe("active")
});
