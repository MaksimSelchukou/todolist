import {v1} from "uuid";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";
import {TodolistsType} from "../App";

test('correct todolists should be added', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const newTodolistTitle = 'New Todolist'

    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: "What to buy", filter: "all"},
        {id: todolistId2, title: "What to learn", filter: "all"},
    ]

    const endState = todolistsReducer(startState,addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
});

test('correct todolists should be removed', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();


    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: "What to buy", filter: "all"},
        {id: todolistId2, title: "What to learn", filter: "all"},
    ]

    const endState = todolistsReducer(startState,removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
});

test('correct title of todolists should ba changed', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const newTitle = 'NEWWW';


    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: "What to buy", filter: "all"},
        {id: todolistId2, title: "What to learn", filter: "all"},
    ]


    const endState = todolistsReducer(startState,changeTitleTodolistAC(newTitle,todolistId1))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(newTitle)
});

test('correct filter of todolists should ba changed', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: "What to buy", filter: "all"},
        {id: todolistId2, title: "What to learn", filter: "all"},
    ]

    const endState = todolistsReducer(startState,changeFilterTodolistAC("active",todolistId1))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe("active")
});
