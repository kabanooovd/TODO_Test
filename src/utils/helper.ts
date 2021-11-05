import { Dispatch } from "redux";
import {CurrentStatus_T, setTodoStatus} from "../Bll/todos-reducer";



const addZero = (num: number) => num < 10 ? `0${num}` : `${num}`;

// Two assistance functions to get current date and time
// "now" have to be declared in function because its have to generate current data
// when its called

export const getCurrentTime = () => {
    const now = new Date();
    return `${addZero(now.getHours())}:${addZero(now.getMinutes())}`
}

export const getCurrentDate = () => {
    const now = new Date();
    return `${addZero(now.getDate())}.${addZero(now.getMonth() + 1)}.${addZero(now.getFullYear())}`
}

export const setCurrentTodoStatus = (id: string, status: CurrentStatus_T, dispatch: Dispatch) => {
    dispatch(setTodoStatus(status, id))
}

