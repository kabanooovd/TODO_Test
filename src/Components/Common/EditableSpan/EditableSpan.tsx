import React, {useState} from "react";
import TextArea from "antd/es/input/TextArea";
import {useDispatch} from "react-redux";
import {setNotification} from "../../../Bll/app-reducer";

export const EditableSpan = ({title, changeTodoTitle}: { title: string, changeTodoTitle: (title: string) => void }) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [editSpan, setEditSpan] = useState(title)

    const dispatch = useDispatch()

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditSpan(e.currentTarget.value)
    }

    const setInputMode = () => {
        setEditMode(true)
    }

    const setSpanMode = () => {
        if (editSpan !== '' && editSpan.length < 19) {
            setEditMode(false)
            changeTodoTitle(editSpan)
        } else {
            setEditSpan('SET TODO TITLE')
            dispatch(setNotification(true))
        }

    }

    return (
        <div>
            {
                editMode
                    ? <TextArea size={'middle'}
                                style={{width: '245px'}}
                                placeholder="Insert text..."
                                autoSize
                                value={editSpan}
                                autoFocus
                                onChange={onChangeHandler}
                                onBlur={setSpanMode}
                    />
                    : <h1 onDoubleClick={setInputMode}>{title}</h1>
            }
        </div>
    )
}


