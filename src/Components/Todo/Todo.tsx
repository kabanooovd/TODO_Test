import React, {useCallback, useEffect} from "react";
import st from './Todo.module.css'
import {AddItemForm} from "../Common/AddItemForm/AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {addTask, TaskType} from "../../Bll/tasks-reducer";
import {Task} from "../Task/Task";
import {
    changeTodoListTitle,
    CurrentStatus_T,
    removeTodo,
    switchCompletedMode
} from "../../Bll/todos-reducer";
import {MainStoreType} from "../../Bll/store";
import {Button, Popconfirm} from "antd";
import {setCurrentTodoStatus} from "../../utils/helper";
import {EditableSpan} from "../Common/EditableSpan/EditableSpan";
import {CheckCircleOutlined} from "@ant-design/icons";

export const Todo: React.FC<{
    title: string, id: string, date: string, time: string, tasks: TaskType[], completedMode: boolean,
    currentStatus: CurrentStatus_T
}> = React.memo( props => {
    const {title, id, date, time, tasks, completedMode, currentStatus} = props

    const dispatch = useDispatch()

    useEffect(() => {
        const checkTasks = tasks.map(el => el.taskStatus).includes(false)
        if (checkTasks) {
            dispatch(switchCompletedMode(id, false))
        } else {
            dispatch(switchCompletedMode(id, true))
        }
    }, [tasks])

    // Assistant variable for sorting tasks by todoList status
    let currentTasks = tasks
    // if status is 'active', render false checkbox only
    if (currentStatus === 'active') currentTasks = tasks.filter(el => !el.taskStatus)
    // if status is 'completed', render true checkbox only
    if (currentStatus === 'completed') currentTasks = tasks.filter(el => el.taskStatus)

    const globalDisabledMode = useSelector<MainStoreType, boolean>(state => state.appState.globalDisabledMode)

    const mappedTasks = currentTasks.map(task => (
        <div key={task.id}>
            <Task task={task} todoListID={id} tasksLength={tasks.length}/>
        </div>
    ))

    const addNewTask = (title: string) => {
        dispatch(addTask(id, title))
    }

    const removeTodoHandler = () => {
        dispatch(removeTodo(id))
    }

    const removeButtonStyles = globalDisabledMode ? st.disabledRemoveTodolistButtonStyles : st.removeTodolistButtonStyles

    const changeTodoTitle = (title: string) => {
        dispatch(changeTodoListTitle(id, title))
    }

    return (
        <div className={st.todoListContainer}>
            <Popconfirm placement="top" title={'Are you sure ?'} onConfirm={removeTodoHandler}
                        okText="Yes" cancelText="No">
                <div className={removeButtonStyles}>&#10008;</div>
            </Popconfirm>
            <div className={st.todoListWrapper}>
                <div>
                    <div className={st.editTodoTitlePosition}>
                        <div className={st.todoHeader}>
                            <EditableSpan title={title} changeTodoTitle={changeTodoTitle}/>
                            {completedMode && <div className={st.checkIconStyles}>
                                <CheckCircleOutlined />
                            </div>}
                        </div>
                    </div>

                    <div className={st.dateStyles}>
                        <span>{date}</span>
                        <span>{time}</span>
                    </div>
                    <div className={st.formPosition}>
                        <AddItemForm addText={addNewTask}/>
                    </div>
                    <div>
                        {mappedTasks}
                    </div>
                </div>
                <div className={st.tasksContentWrapper}>
                    <Button type="primary"
                            className={st.statusButtonStyles}
                            onClick={() => setCurrentTodoStatus(id, 'all', dispatch)}
                    >All</Button>
                    <Button type="primary"
                            className={st.statusButtonStyles}
                            onClick={() => setCurrentTodoStatus(id, 'active', dispatch)}
                    >Active</Button>
                    <Button type="primary"
                            className={st.statusButtonStyles}
                            onClick={useCallback(() => setCurrentTodoStatus(id, 'completed', dispatch), [id, dispatch])}
                    >Completed</Button>

                </div>
            </div>
        </div>
    )
})
