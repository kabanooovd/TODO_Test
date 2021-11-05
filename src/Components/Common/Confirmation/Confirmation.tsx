import React, {useState} from "react";
import st from './Confirmation.module.css'
import {useDispatch} from "react-redux";
import {editTaskTitle, setEditFlag} from "../../../Bll/tasks-reducer";
import {setGlobalDisabledMode} from "../../../Bll/app-reducer";
import TextArea from "antd/es/input/TextArea";
import {Button} from "antd";

export const Confirmation = ({todoListID, taskID}: { todoListID: string, taskID: string }) => {

    const dispatch = useDispatch()

    const [val, setVal] = useState('')

    const confirmChanges = () => {
        if (val !== '') {
            dispatch(editTaskTitle(todoListID, taskID, val))
            dispatch(setEditFlag(todoListID, taskID, false))
            dispatch(setGlobalDisabledMode(false))
        } else {
            dispatch(editTaskTitle(todoListID, taskID, 'SET TASK TITLE...'))
            dispatch(setEditFlag(todoListID, taskID, false))
            dispatch(setGlobalDisabledMode(false))
        }
    }

    const onRejectHandler = () => {
        dispatch(setEditFlag(todoListID, taskID, false))
        dispatch(setGlobalDisabledMode(false))
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setVal(e.currentTarget.value)
    }

    return (
        <div className={st.confirmWrapper}>
            {/*<AddItemForm addText={onConfirmHandler} />*/}
            <TextArea size={'middle'}
                      style={ {width: '245px'} }
                      placeholder="Insert text..."
                      autoSize
                      value={val}
                      autoFocus
                      onChange={onChangeHandler}
            />

            <div className={''}>
                <Button type={'primary'} onClick={confirmChanges}>Ok</Button>
                <Button onClick={onRejectHandler}>Cancel</Button>
                {/*<button onClick={onRejectHandler}>Cancel</button>*/}
            </div>

        </div>

    )
}