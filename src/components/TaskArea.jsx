import React from 'react';
import Modal from 'react-modal';
Modal.setAppElement("#root");

export const TaskArea = (props) => {
    const {
        todos, 
        onChangeExistingTaskStatus, 
        onClickDelete, 
        ON_EDIT_FLG_TRUE, 
        onClickEdit,
        onClickBackEdit,
        onChangeEditTaskTitleText,
        onChangeEditTaskDetailText,
        onClickUpdateTask,
        modalIsOpen,
        setIsOpen,
        comments,
        onClickAddComment,
        commentContentText,
        onChangeCommentContentText,
        onClickOpenComment,
        activeCommentParent
    } = props;
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
                if(todo.editFlg === ON_EDIT_FLG_TRUE){
                    return (
                        <li key={index} style={{listStyle: 'none'}}>
                            <div className={taskStyle}>
                                <p className="task-id-style">{todo.id}</p>
                                <input id={`task-${todo.id}-title`} type="text" className="add-input-style" defaultValue={todo.title} placeholder="タイトル" maxLength='10' onChange={onChangeEditTaskTitleText} />
                                <select 
                                    id={`task-${todo.id}-status`} 
                                    className="task-status-style"
                                    value={todo.status} onChange={() => {onChangeExistingTaskStatus(todo.id, document.getElementById(`task-${todo.id}-status`).value)}}
                                >
                                    <option value="未着手">未着手</option>
                                    <option value="進行中">進行中</option>
                                    <option value="完了">完了</option>
                                </select>
                                <input id={`task-${todo.id}-detail`} type="text" className="add-input-detail-style" defaultValue={todo.detail} placeholder="タスク詳細"  maxLength='50' onChange={onChangeEditTaskDetailText} />
                                <p className="task-date-style">期限：{todo.date}</p>
                                <p className="task-created-at-style">作成日：{todo.createdAt}</p>
                                <button type="button" className="task-delete-button-style" onClick={() => {onClickUpdateTask(todo.id)}} >確定</button>
                                <button type="button" className="task-delete-button-style" onClick={() => {onClickBackEdit(todo.id)}} >戻す</button>
                            </div>
                        </li>
                    )
                }else{
                    return (
                        <li key={index} style={{listStyle: 'none'}}>
                            <div className={taskStyle}>
                                <p className="task-id-style">{todo.id}</p>
                                <p id={`task-${todo.id}-title`} className="task-title-style">{todo.title}</p>
                                <select 
                                    id={`task-${todo.id}-status`} 
                                    className="task-status-style"
                                    value={todo.status} onChange={() => {onChangeExistingTaskStatus(todo.id, document.getElementById(`task-${todo.id}-status`).value)}}
                                >
                                    <option value="未着手">未着手</option>
                                    <option value="進行中">進行中</option>
                                    <option value="完了">完了</option>
                                </select>
                                <p id={`task-${todo.id}-detail`} className="task-detail-style">{todo.detail}</p>
                                <p className="task-date-style">期限：{todo.date}</p>
                                <p className="task-created-at-style">作成日：{todo.createdAt}</p>
                                <button type="button" className="task-delete-button-style" onClick={() => {onClickDelete(todo.id)}} >削除</button>
                                <button type="button" className="task-delete-button-style" onClick={() => {onClickEdit(todo.id)}} >編集</button>
                                <div>
                                    <button id={todo.id} className="task-delete-button-style" onClick={onClickOpenComment}>コメント</button>
                                    <Modal isOpen={modalIsOpen}>
                                    <button onClick={() => setIsOpen(false)}>閉じる</button>
                                    <div>
                                        <input type="text" value={commentContentText} onChange={onChangeCommentContentText} />
                                        <button type="button" onClick={() => {onClickAddComment(activeCommentParent)}}>コメントする</button>
                                    </div>
                                    <h2>コメント一覧</h2>
                                    {comments.map((comment, index)=>{
                                        return (
                                            <div>
                                                {activeCommentParent === comment.parentId && <><p>{comment.content}</p><hr /></>}
                                            </div>
                                        )
                                    })
                                    }
                                    </Modal>
                                </div>
                            </div>
                        </li>
                    )
                }
            })}
        </ul>
        </div>
    )
}