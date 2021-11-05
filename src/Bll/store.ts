import {combineReducers, createStore} from "redux";
import {todosReducer} from "./todos-reducer";
import {tasksReducer} from "./tasks-reducer";
import {appReducer} from "./app-reducer";

export type MainStoreType = ReturnType<typeof RootReducer>

const RootReducer = combineReducers({
    todosState: todosReducer,
    tasksState: tasksReducer,
    appState: appReducer,
})

export const store = createStore(RootReducer)

// The command below will give an opportunity refer to store in browser console
// @ts-ignore
window.store = store