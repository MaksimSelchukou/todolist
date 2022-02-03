import {v1} from "uuid";
import {TaskStateType} from "../App";
import {addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {removeTodolistAC} from "./todolists-reducer";


test('correct task should be added from correct array', () => {

    let newTitle = 'NEW TASK'


    const startState: TaskStateType = {
        "todolistId1": [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        "todolistId2": [
            {id: v1(), title: "HTML&CSS", isDone: false},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ]
    };


    const endState = tasksReducer(startState, addTaskAC(newTitle, "todolistId1"))

    expect(endState["todolistId1"].length).toBe(6)
    expect(endState['todolistId1'][0].title).toBe(newTitle)
})


test('correct task should be remove from correct array', () => {

    const startState: TaskStateType = {
        "todolistId1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
        ],
        "todolistId2": [
            {id: "1", title: "HTML&CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
        ]
    };


    const endState = tasksReducer(startState, removeTaskAC("1", "todolistId1"))

    expect(endState["todolistId1"].length).toBe(1)
    expect(endState['todolistId1'][0].id).toBe("2")
})

test('status of specified task should be changed', () => {

    const startState: TaskStateType = {
        "todolistId1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
        ],
        "todolistId2": [
            {id: "1", title: "HTML&CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
        ]
    };


    const endState = tasksReducer(startState, changeStatusTaskAC("1", false, "todolistId1"))

    expect(endState["todolistId1"].length).toBe(2)
    expect(endState['todolistId1'][0].isDone).toBe(false)
})

test('title of specified task should be changed', () => {

    const newTitle = "NEW TASKKKK"
    const startState: TaskStateType = {
        "todolistId1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
        ],
        "todolistId2": [
            {id: "1", title: "HTML&CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
        ]
    };


    const endState = tasksReducer(startState, changeTitleTaskAC(newTitle, "todolistId2", "2"))

    expect(endState["todolistId2"].length).toBe(2)
    expect(endState['todolistId2'][1].title).toBe(newTitle)
})

test('property with todolistId should be deleted', () => {

    const startState: TaskStateType = {
        "todolistId1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
        ],
        "todolistId2": [
            {id: "1", title: "HTML&CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
        ]
    };


    const endState = tasksReducer(startState, removeTodolistAC("todolistId2"))
    const keys = Object.keys(endState)


    expect(keys.length).toBe(1)
    expect(endState["todolistId2"]).toBeUndefined()
})