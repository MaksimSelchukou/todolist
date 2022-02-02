import {v1} from "uuid";
import {TaskStateType} from "../App";
import {addTask, changeStatusTask, changeTitleTask, removeTask, tasksReducer} from "./tasks-reducer";
import {removeTodolist} from "./todolists-reducer";


test.skip('correct task should be added from correct array', () => {

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


    const endState = tasksReducer(startState, addTask(newTitle, "todolistId1"))

    expect(endState["todolistId1"].length).toBe(6)
    expect(endState['todolistId1'][0].title).toBe(newTitle)
})


test.skip('correct task should be remove from correct array', () => {

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


    const endState = tasksReducer(startState, removeTask("1", "todolistId1"))

    expect(endState["todolistId1"].length).toBe(1)
    expect(endState['todolistId1'][0].id).toBe("2")
})

test.skip('status of specified task should be changed', () => {

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


    const endState = tasksReducer(startState, changeStatusTask("1", false, "todolistId1"))

    expect(endState["todolistId1"].length).toBe(2)
    expect(endState['todolistId1'][0].isDone).toBe(false)
})

test.skip('title of specified task should be changed', () => {

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


    const endState = tasksReducer(startState, changeTitleTask(newTitle, "todolistId2", "2"))

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


    const endState = tasksReducer(startState, removeTodolist("todolistId2"))
    const keys = Object.keys(endState)


    expect(keys.length).toBe(1)
    expect(endState["todolistId2"]).toBeUndefined()
})