import {TaskStateType, TodolistsType} from "../App";
import {addTodolist, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";


test('ids should be equals',()=>{
    const startTasksState:TaskStateType = {}
    const startTodolistsState:Array<TodolistsType> = []

    const action = addTodolist("new todolist")
    const endTasksState = tasksReducer(startTasksState,action)
    const endTodolistsState = todolistsReducer(startTodolistsState,action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todoID)
    expect(idFromTodolists).toBe(action.todoID)







})