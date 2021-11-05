import {getCurrentDate, getCurrentTime} from "../utils/helper";

export const SET_TODO = 'todos/SET_TODO'
export const REMOVE_TODO = 'todos/REMOVE_TODO'
export const SET_STATUS = 'todos/SET_STATUS'
export const SET_TODO_NEW_TITLE = 'todos/SET_TODO_NEW_TITLE'
export const COMPLETED_MODE = 'todos/COMPLETED_MODE'

export type CurrentStatus_T = 'all' | 'active' | 'completed' // this way of typing executed as a typescript assistance
export type todoList_T = {
    id: string
    title: string
    currentStatus: CurrentStatus_T
    date: string
    time: string
    completedMode: boolean
}

type todosStateType = {
    todos: todoList_T[]
}

const initState: todosStateType = {
    todos: []
}

export const todosReducer = (state: todosStateType = initState, action: TodosActionTypes): todosStateType => {
    switch (action.type) {
        case SET_TODO:
            const newTodo: todoList_T = {   // Creating new todoList
                id: action.todoListID,
                title: action.title,
                currentStatus: 'all',
                time: getCurrentTime(),
                date: getCurrentDate(),
                completedMode: false
            }
            return {...state, todos: [newTodo, ...state.todos]}
        case REMOVE_TODO:
            return {...state, todos: state.todos.filter(el => el.id !== action.todoListID)}
        case SET_STATUS:
            return {...state, todos: state.todos
                    .map(el => el.id === action.todoListID ? {...el, currentStatus: action.currentStatus} : el)}
        case SET_TODO_NEW_TITLE:
            return {...state, todos: state.todos
                    .map(el => el.id === action.todoListID ? {...el, title: action.title} : el)}
        case COMPLETED_MODE:
            return {...state, todos: state.todos
                    .map(el => el.id === action.todoListID ? {...el, completedMode: action.completedMode} : el)}
        default: return state
    }
}

export const switchCompletedMode = (todoListID: string, completedMode: boolean) => {
    return {type: COMPLETED_MODE, completedMode, todoListID} as const
}

export const changeTodoListTitle = (todoListID: string, title: string) => {
    return {type: SET_TODO_NEW_TITLE, todoListID, title} as const
}

export const setTodoStatus = (currentStatus: CurrentStatus_T, todoListID: string) => {
    return {type: SET_STATUS, currentStatus, todoListID} as const
}

export const removeTodo = (todoListID: string) => {
    // this action will be used in tasksReducer, because we have to remove tasks which were belong to removed todoList
    return {type: REMOVE_TODO, todoListID} as const
}

export const setToDoList = (title: string, todoListID: string) => {
    // generating todoListID in action because its gonna be a property of tasks array and this action
    // will be used in tasksReducer
    return {type: SET_TODO, title, todoListID} as const
}

type TodosActionTypes = ReturnType<
    typeof setToDoList |
    typeof switchCompletedMode |
    typeof setTodoStatus |
    typeof changeTodoListTitle |
    typeof removeTodo
>





