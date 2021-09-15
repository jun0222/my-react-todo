import React from 'react';

export const TaskArea = (props) => {
    const {todos, onChangeExistingTaskStatus, onClickDelete} = props;
    return (
        <div>
        <ul>
            {todos.map((todo, index)=>{
                let taskStyle = {};
                if (todo.status === "未着手") {
                    taskStyle = 'status-not-started-yet-task-style';
                } else if (todo.status === "進行中") {
                    taskStyle = 'status-in-progress-task-style';
                } else {
                    taskStyle = 'status-complete-task-style';
                }
                return(
                    <li key={index} style={{listStyle: 'none'}}>
                        <div className={taskStyle}>
                            <p className="task-id-style">{todo.id}</p>
                            <p className="task-title-style">{todo.title}</p>
                            <select 
                                id={`task-${todo.id}-status`} 
                                className="task-status-style"
                                value={todo.status} onChange={() => {onChangeExistingTaskStatus(todo.id, document.getElementById(`task-${todo.id}-status`).value)}}
                            >
                                <option value="未着手">未着手</option>
                                <option value="進行中">進行中</option>
                                <option value="完了">完了</option>
                            </select>
                            <p className="task-detail-style">{todo.detail}</p>
                            <p className="task-date-style">期限：{todo.date}</p>
                            <p className="task-created-at-style">作成日：{todo.createdAt}</p>
                            <button type="button" className="task-delete-button-style" onClick={() => {onClickDelete(todo.id)}} >削除</button>
                        </div>
                    </li>
                );
            })}
        </ul>
        </div>
    )
}