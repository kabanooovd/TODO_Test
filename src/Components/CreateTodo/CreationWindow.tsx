import {Button} from "antd";
import st from './CreationWindow.module.css'
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addTask} from "../../Bll/tasks-reducer";
import {v1} from "uuid";
import {setToDoList, todoList_T} from "../../Bll/todos-reducer";
import {setGlobalDisabledMode, setNotification} from "../../Bll/app-reducer";
import {MainStoreType} from "../../Bll/store";
import {Notificator} from "../Common/Notificator/Notificator";

export const CreationWindow = ( {setCreateTodoFlag} : {setCreateTodoFlag: (createTodoFlag: boolean) => void} ) => {

    const dispatch = useDispatch()

    const [todoListVal, setTodoLstVal] = useState<string>('')
    const [taskVal, setTaskVal] = useState<string>('')
    // const [errorNotification, setErrorNotification] = useState<boolean>(false)

    const todosData = useSelector<MainStoreType, todoList_T[]>(state => state.todosState.todos)

    const changeTodoListTitle = (e: React.ChangeEvent<HTMLInputElement> ) => {
        setTodoLstVal(e.currentTarget.value)
    }

    const changeTaskTitle = (e: React.ChangeEvent<HTMLInputElement> ) => {
        setTaskVal(e.currentTarget.value)
    }

    const createTodo = () => {
        if (todosData.map(el => el.title).includes(todoListVal)) {
            setTodoLstVal('')
            dispatch(setNotification(true))
        } else {
            if (todoListVal.length <= 18) {
                const todolistID = v1()
                dispatch(setToDoList(todoListVal, todolistID))
                dispatch(addTask(todolistID, taskVal))
                setCreateTodoFlag(false)
                dispatch(setGlobalDisabledMode(false))
            } else {
                dispatch(setNotification(true))
            }

        }
    }

    const cancelCreation = () => {
        setCreateTodoFlag(false)
        dispatch(setGlobalDisabledMode(false))
    }

    // const setErrorNotification = () => {
    //     dispatch(setNotification(false))
    // }

    return <div className={st.modalWindowWrapper}>
        {/*<div className={st.notificatorParent}>*/}
        {/*    {*/}
        {/*        notification && <Notificator text={`Please use other name, not longer then 18 symbols`}*/}
        {/*                                          setErrorNotification={setErrorNotification}*/}
        {/*        />*/}
        {/*    }*/}
        {/*</div>*/}
        <div>
            <h4>Todo name</h4>
            <input type="text" value={todoListVal} onChange={changeTodoListTitle}/>
        </div>
        <div>
            <h4>First Task</h4>
            <input type="text" value={taskVal} onChange={changeTaskTitle}/>
        </div>
        <div className={st.creationRemoteWrapper}>
            <Button disabled={todoListVal === '' || taskVal === ''} onClick={createTodo}>Create</Button>
            <Button onClick={cancelCreation}>Cancel</Button>
        </div>

    </div>
}