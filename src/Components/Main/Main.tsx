import React from "react";
import {Header} from "../Header/Header";
import {TodosList} from "../TodosList/TodosList";
import st from "../CreateTodo/CreationWindow.module.css";
import {Notificator} from "../Common/Notificator/Notificator";
import {setNotification} from "../../Bll/app-reducer";
import {useDispatch, useSelector} from "react-redux";
import {MainStoreType} from "../../Bll/store";

export const Main = () => {

    const dispatch = useDispatch()

    const notification = useSelector<MainStoreType, boolean>(state => state.appState.noticeMode)

    const setErrorNotification = () => {
        dispatch(setNotification(false))
    }

    return (
        <>
            <Header/>
            <div className={st.notificatorParent}>
                {notification && <Notificator text={`Please use other name, not longer then 18 symbols`}
                                                 setErrorNotification={setErrorNotification}
                    />}
            </div>
            <TodosList/>
        </>
    )
}





