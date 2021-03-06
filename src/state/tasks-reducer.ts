import {v1} from "uuid";
import {TaskStateType, TaskType} from "../App";
import {addTodolistType, removeTodolistType} from "./todolists-reducer";


type actionsType =
    addTaskType
    | removeTaskType
    | changeStatusTaskType
    | changeTitleTaskType
    | addTodolistType
    | removeTodolistType;

const initialState:TaskStateType = {

}

export const tasksReducer = (state: TaskStateType = initialState, action: actionsType): TaskStateType => {
    switch (action.type) {
        case 'ADD-TASK': {
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todoID]: [newTask, ...state[action.todoID]]}
        }
        case 'REMOVE-TASK': {
            return {...state, [action.todoID]: state[action.todoID].filter(f => f.id !== action.taskID)}
        }
        case "CHANGE-STATUS-TASK": {
            return {
                ...state,
                [action.todoID]: state[action.todoID].map(m => m.id === action.taskID ? {
                    ...m,
                    isDone: action.isDone
                } : m)
            }
        }
        case "CHANGE-TITLE-TASK": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(m => m.id === action.taskID ? {
                    ...m,
                    title: action.title
                } : m)
            }
        }
        case "ADD-TODOLIST": {
            // const stateCopy = {...state}
            // stateCopy[action.todoID] = []
            // return stateCopy

            return {...state, [action.todoID]: []}
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

type addTaskType = ReturnType<typeof addTaskAC>

export const addTaskAC = (title: string, todoID: string) => {
    return {
        type: 'ADD-TASK',
        title,
        todoID
    } as const
}

type removeTaskType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (taskID: string, todolistID: string) => {
    return {
        type: 'REMOVE-TASK',
        taskID: taskID,
        todoID: todolistID
    } as const
}

type changeStatusTaskType = ReturnType<typeof changeStatusTaskAC>

export const changeStatusTaskAC = (taskID: string, isDone: boolean, todolistID: string) => {
    return {
        type: 'CHANGE-STATUS-TASK',
        taskID: taskID,
        isDone,
        todoID: todolistID
    } as const
}

type changeTitleTaskType = ReturnType<typeof changeTitleTaskAC>
export const changeTitleTaskAC = (title: string, todolistID: string, taskID: string) => {
    return {
        type: 'CHANGE-TITLE-TASK',
        title,
        todolistID,
        taskID
    } as const
}



