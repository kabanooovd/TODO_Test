import React from "react";
import st from './Task.module.css'
import 'antd/dist/antd.css';
import {removeTask, setEditFlag, TaskType} from "../../Bll/tasks-reducer";
import {SelfCreatedCheckbox} from "../Common/SelfCreatedCheckbox/SelfCreatedCheckbox";
import {Button} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {Confirmation} from "../Common/Confirmation/Confirmation";
import {MainStoreType} from "../../Bll/store";
import {setGlobalDisabledMode} from "../../Bll/app-reducer";
import {removeTodo} from "../../Bll/todos-reducer";

export const Task = ({task, todoListID, tasksLength} : {task: TaskType, todoListID: string, tasksLength: number}) => {

    const dispatch = useDispatch()

    const globalDisabledMode = useSelector<MainStoreType, boolean>(state => state.appState.globalDisabledMode)

    const removeTaskHandler = () => {
        tasksLength <= 1 ? dispatch(removeTodo(todoListID)) : dispatch(removeTask(todoListID, task.id))
    }

    const editTaskTitleHandler = () => {
        dispatch(setEditFlag(todoListID, task.id, true))
        dispatch(setGlobalDisabledMode(true))
    }

    return (
        <div className={st.taskWrapper}>
            <div className={st.titleWrapper}>
                <div className={st.checkboxRelativePosition}>
                        <SelfCreatedCheckbox checkedMode={task.taskStatus}
                                             todoListID={todoListID}
                                             taskID={task.id}
                                             width={20}
                                             height={20}
                                             fontSize={10}
                        />
                </div>
                <div className={st.titleStyles}>
                    {task.title}
                </div>
            </div>
            <div className={st.taskRemoteWrapper}>
                <div className={st.confirmContainer}>
                    {task.editFlag && <Confirmation taskID={task.id} todoListID={todoListID}/>}
                </div>
                <Button type="primary" icon={<DeleteOutlined />} size={'small'}
                        onClick={removeTaskHandler} disabled={globalDisabledMode}
                />
                <Button type="primary" icon={<EditOutlined />} size={'small'}
                        onClick={editTaskTitleHandler} disabled={globalDisabledMode}
                />
            </div>
        </div>
    )
}


