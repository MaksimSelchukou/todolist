import {v1} from "uuid";
import {TodolistsType} from "../App";
import {FilterValueType} from "../Todolist";

const CHANGE_TITLE_TODOLIST = 'CHANGE-TITLE-TODOLIST';
const ADD_TODOLIST = 'ADD-TODOLIST';
const REMOVE_TODOLIST = 'REMOVE-TODOLIST';
const CHANGE_FILTER_TODOLIST = 'CHANGE-FILTER-TODOLIST'


type ActionsType = addTodolistType | removeTodolistType | changeTitleTodolistType | changeFilterTodolistType;


const initialState:Array<TodolistsType> = [

]

export const todolistsReducer = (state: Array<TodolistsType> = initialState, action: ActionsType): Array<TodolistsType> => {
    switch (action.type) {
        case ADD_TODOLIST: {
            let newTodolist: TodolistsType = {id: action.todoID, title: action.title, filter: "all"}
            return [newTodolist,...state]
        }
        case REMOVE_TODOLIST: {
            return state.filter(f => f.id !== action.id)
        }
        case CHANGE_TITLE_TODOLIST: {
            return state.map(m => m.id === action.id ? {...m, title: action.title} : m)
        }
        case CHANGE_FILTER_TODOLIST:{
            return state.map(m=>m.id === action.id ? {...m,filter:action.filter}:m)
        }
        default:
            return state
    }
}

export type addTodolistType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: ADD_TODOLIST,
        title: title,
        todoID:v1()
    } as const
}
export type removeTodolistType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: REMOVE_TODOLIST,
        id: id,
    } as const
}

type changeTitleTodolistType = ReturnType<typeof changeTitleTodolistAC>

export const changeTitleTodolistAC = ( title: string,id: string) => {
    return {
        type: CHANGE_TITLE_TODOLIST,
        id,
        title,
    } as const
}

type changeFilterTodolistType = ReturnType<typeof changeFilterTodolistAC>

export const changeFilterTodolistAC = (filter:FilterValueType,id:string) =>{
    return{
        type:CHANGE_FILTER_TODOLIST,
        id,
        filter,
    }as const
}

