import React from "react";
import st from './TodosList.module.css'
import {Todo} from "../Todo/Todo";
import {useSelector} from "react-redux";
import {MainStoreType} from "../../Bll/store";
import {todoList_T} from "../../Bll/todos-reducer";
import {TasksReducerType} from "../../Bll/tasks-reducer";
import {CreateTodo} from "../CreateTodo/CreateTodo";

export const TodosList = () => {

    const todos = useSelector<MainStoreType, todoList_T[]>(state => state.todosState.todos)

    const tasks = useSelector<MainStoreType, TasksReducerType>(state => state.tasksState)

    const mappedTodos = todos.map(tdl => {

        return (
            <div key={tdl.id}>
                <Todo id={tdl.id}
                      title={tdl.title}
                      date={tdl.date}
                      time={tdl.time}
                      tasks={tasks[tdl.id]}
                      completedMode={tdl.completedMode}
                      currentStatus={tdl.currentStatus}
                />
            </div>
        )
    })

    return(
        <div>
            <div className={st.initAppWrapper}>
                <h2>Welcome</h2>
                {todos.length === 0 && <h3>You have no todos yet...</h3>}
                <div className={st.createTodoWrapper}>
                    <CreateTodo />
                </div>
            </div>
            <div className={st.todosContainer}>
                {mappedTodos}
            </div>
        </div>
    )
}