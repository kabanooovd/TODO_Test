import {REMOVE_TODO, removeTodo, SET_TODO, setToDoList} from "./todos-reducer";
import {v1} from "uuid";

const ADD_TASK = 'tasks/ADD_TASK'
const SET_TASK_STATUS = 'tasks/SET_TASK_STATUS'
const REMOVE_TASK = 'tasks/REMOVE_TASK'
const EDIT_TASK_TITLE = 'tasks/EDIT_TASK_TITLE'
const SET_EDIT_FLAG = 'tasks/SET_EDIT_FLAG'

export type TaskType = {
    id: string
    title: string
    taskStatus: boolean
    editFlag: boolean
}

export type TasksReducerType = {
    [key: string]: TaskType[]
}

const initState: TasksReducerType = {}

export const tasksReducer = (state: TasksReducerType = initState, action: TasksActionTypes): TasksReducerType => {
    switch (action.type) {
        case SET_TODO:
            return {...state, [action.todoListID]: []}
        case ADD_TASK:
            const newTask: TaskType = {id: v1(), title: action.title, taskStatus: false, editFlag: false}
            return {...state, [action.todoListID]: [newTask, ...state[action.todoListID]]}
        case SET_TASK_STATUS:
            return {...state, [action.todoListID]: state[action.todoListID]
                    .map(el => el.id === action.taskID ? {...el, taskStatus: action.status} : el)}
        case REMOVE_TODO:
            // delete property of removed todoList
            let copyState = {...state}
            delete copyState[action.todoListID]
            return copyState
        case REMOVE_TASK:
            return {...state, [action.todoListID]: state[action.todoListID].filter(el => el.id !== action.taskID)}
        case EDIT_TASK_TITLE:
            return {...state, [action.todoListID]: state[action.todoListID]
                    .map(el => el.id === action.taskID ? {...el, title: action.title} : el)}
        case SET_EDIT_FLAG:
            return {...state, [action.todoListID]: state[action.todoListID]
                    .map(el => el.id === action.taskID ? {...el, editFlag: action.editFlag} : el)}
        default: return state
    }
}

export const setEditFlag = (todoListID: string, taskID: string, editFlag: boolean) => {
    return {type: SET_EDIT_FLAG, todoListID, taskID, editFlag} as const
}

export const editTaskTitle = (todoListID: string, taskID: string, title: string) => {
    return {type: EDIT_TASK_TITLE, taskID, title, todoListID} as const
}

export const removeTask = (todoListID: string, taskID: string) => {
    return {type: REMOVE_TASK, taskID, todoListID} as const
}

export const setTaskStatus = (status: boolean, todoListID: string, taskID: string) => {
    return {type: SET_TASK_STATUS, status, todoListID, taskID} as const
}

export const addTask = (todoListID: string, title: string) => {
    return {type: ADD_TASK, todoListID, title} as const
}

type TasksActionTypes = ReturnType<
    typeof setToDoList |
    typeof setTaskStatus |
    typeof removeTodo |
    typeof removeTask |
    typeof editTaskTitle |
    typeof setEditFlag |
    typeof addTask
>



