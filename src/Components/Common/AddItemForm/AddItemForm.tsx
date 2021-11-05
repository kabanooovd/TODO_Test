import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import s from './AddItemForm.module.css'
import {PlusSquareOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {setGlobalDisabledMode} from "../../../Bll/app-reducer";
import {MainStoreType} from "../../../Bll/store";

export type AddItemFormType = {
    addText: (title: string) => void
    setCreateTodoFlag?: (createTodoFlag: boolean) => void
}

export const AddItemForm: React.FC<AddItemFormType> = React.memo(function (props) {

    const {addText, setCreateTodoFlag} = props

    const dispatch = useDispatch()

    const globalDisabledMode = useSelector<MainStoreType, boolean>(state => state.appState.globalDisabledMode)

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = useCallback(() => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            addText(newTitle);
            setTitle("");
            dispatch(setGlobalDisabledMode(false))
        } else {
            setError("Insert TEXT");
            setTitle("");
        }
        setCreateTodoFlag && setCreateTodoFlag(false)
    }, [dispatch, title, addText, setCreateTodoFlag])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        error !== null && setError(null);
        e.key === 'Enter' && addTask();
    }

    const addBtnStyles = globalDisabledMode ? s.disabledAddBtnMode : s.addBtnStyles

    return(
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? `${s.error}` : `${s.notError}`}
                   disabled={globalDisabledMode}
            />
            <button onClick={addTask} className={addBtnStyles} disabled={globalDisabledMode}>
                <PlusSquareOutlined />
            </button>
            {error && <div className={`${s.errorMessage}`}>{error}</div>}
        </div>
    )
})
