import React from "react";
import st from './SelfCreatedCheckbox.module.css'
import {useDispatch, useSelector} from "react-redux";
import {setTaskStatus} from "../../../Bll/tasks-reducer";
import {MainStoreType} from "../../../Bll/store";

export const SelfCreatedCheckbox = React.memo(({
    checkedMode,
    todoListID,
    taskID,
    width,
    height,
    fontSize,
} : {
    checkedMode: boolean
    todoListID: string
    taskID: string
    width: number
    height: number
    fontSize: number
}) => {

    const dispatch = useDispatch()

    const commonStyles = {
        width: `${width}px`,
        height: `${height}px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        backgroundColor: '#424141',
        color: 'yellowgreen',
        fontSize: `${fontSize}px`,
        marginRight: '10px'
    }

    const globalDisabledMode = useSelector<MainStoreType, boolean>(state => state.appState.globalDisabledMode)

    const disabledModeStyles = globalDisabledMode ? st.disabledCheckboxStyles : ''

    return <div className={disabledModeStyles}>
        {
            checkedMode
                ?
                <div style={commonStyles}
                     onClick={() => dispatch(setTaskStatus(!checkedMode, todoListID, taskID))}
                >
                    &#10004;
                </div>
                :
                <div style={commonStyles}
                     onClick={() => dispatch(setTaskStatus(!checkedMode, todoListID, taskID))}
                />
        }
    </div>
})