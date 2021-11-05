import React, {useState} from "react";
import st from './CreateTodo.module.css'
import {CreationWindow} from "./CreationWindow";
import {useDispatch, useSelector} from "react-redux";
import {MainStoreType} from "../../Bll/store";
import {setGlobalDisabledMode} from "../../Bll/app-reducer";

export const CreateTodo = () => {

    const dispatch = useDispatch()

    const [createTodoFlag, setCreateTodoFlag] = useState<boolean>(false)

    const globalDisabledMode = useSelector<MainStoreType, boolean>(state => state.appState.globalDisabledMode)

    const creationButtonStyles = globalDisabledMode ? st.disabledCreateTodoButtonWrapper : st.createTodoButtonWrapper

    const createTodoButtonHandler = () => {
        setCreateTodoFlag(!createTodoFlag)
        dispatch(setGlobalDisabledMode(true))
    }



    return(
        <div className={st.creationTodoContainer}>
            <div onClick={createTodoButtonHandler} className={creationButtonStyles}>Create Todo
                List
            </div>
            {
                createTodoFlag &&
                <div className={st.createTodoInputsWrapper}>
                    <CreationWindow setCreateTodoFlag={setCreateTodoFlag}/>
                </div>
            }
        </div>
    )
}
