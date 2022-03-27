import React, { useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

export const TaskArea = (props) => {

  // useState
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [comments, setComments] = useState([]);
  const [activeCommentParent, setActiveCommentParent] = useState();
  const [taskEditTitleText, setTaskEditTitleText] = useState("");
  const [taskEditDetailText, setTaskEditDetailText] = useState("");
  const [commentId, setCommentId] = useState(1);

  // props
  const {
    id,
    todos,
    setTodos,
    ON_EDIT_FLG_TRUE,
    ON_EDIT_FLG_FALSE,
    setDbMock,
  } = props;

  // onchange関連
  const onChangeExistingTaskStatus = (statusChangeTodoId, setValue) => {
    const newTodos = [...todos];
    for (let i = 0; i < newTodos.length; i++) {
      if (newTodos[i].id === statusChangeTodoId) {
        newTodos[i].status = setValue;
      }
    }
    setTodos(newTodos);
  };

  const onClickEdit = (editTodoId) => {
    const newTodos = [...todos];
    for (let i = 0; i < newTodos.length; i++) {
      if (newTodos[i].id === editTodoId) {
        newTodos[i].editFlg = ON_EDIT_FLG_TRUE;
      }
    }
    setTodos(newTodos);
  };

  const onClickDelete = (deleteTodoId) => {
    const newTodos = [...todos];
    for (let i = 0; i < newTodos.length; i++) {
      if (newTodos[i].id === deleteTodoId) {
        newTodos.splice(i, 1);
      }
    }
    setTodos(newTodos);
    setDbMock(newTodos);
  };

  const onClickBackEdit = (editBackTodoId) => {
    const newTodos = [...todos];
    for (let i = 0; i < newTodos.length; i++) {
      if (newTodos[i].id === editBackTodoId) {
        newTodos[i].editFlg = ON_EDIT_FLG_FALSE;
      }
    }
    setTodos(newTodos);
  };

  const onChangeEditTaskTitleText = (event) => {
    setTaskEditTitleText(event.target.value);
  };
  const onChangeEditTaskDetailText = (event) => {
    setTaskEditDetailText(event.target.value);
  };

  // onclick関連
  const onClickUpdateTask = (updateTodoId) => {
    if (taskEditTitleText === "") {
      var defaultTaskEditTitleText = document.getElementById(
        `task-${updateTodoId}-title`
      ).value;
    }
    if (taskEditDetailText === "") {
      var defaultTaskEditDetailText = document.getElementById(
        `task-${updateTodoId}-detail`
      ).value;
    }
    if (taskEditTitleText === "" && defaultTaskEditTitleText === "") {
      return;
    }
    if (taskEditDetailText === "" && defaultTaskEditDetailText === "") {
      return;
    }

    const newTodos = [...todos];
    for (let i = 0; i < newTodos.length; i++) {
      if (newTodos[i].id === updateTodoId) {
        if (taskEditTitleText) {
          newTodos[i].title = taskEditTitleText;
        } else {
          newTodos[i].title = defaultTaskEditTitleText;
        }
        if (taskEditDetailText) {
          newTodos[i].detail = taskEditDetailText;
        } else {
          newTodos[i].detail = defaultTaskEditDetailText;
        }
        newTodos[i].editFlg = ON_EDIT_FLG_FALSE;
      }
    }
    setTaskEditTitleText("");
    setTaskEditDetailText("");
    setTodos(newTodos);
    setDbMock(newTodos);
  };

  const onClickAddComment = (parentId) => {
    if (commentContentText === "") {
      return;
    }
    const newCommentId = id + 1;
    const createdAt = new Date();
    const createdAtYyyymmdd =
      createdAt.getFullYear() +
      "/" +
      (createdAt.getMonth() + 1) +
      "/" +
      createdAt.getDate();
    const commentObj = {
      id: commentId,
      parentId: parentId,
      content: commentContentText,
      createdAt: createdAtYyyymmdd,
    };
    const newComments = [...comments, commentObj];
    setComments(newComments);
    setCommentContentText("");
    setCommentId(newCommentId);
  };

  const [commentContentText, setCommentContentText] = useState("");

  const onChangeCommentContentText = (event) =>
    setCommentContentText(event.target.value);

  const onClickOpenComment = (event) => {
    setIsOpen(true);
    setActiveCommentParent(event.target.id);
  };

  return (
    <div>
      <ul>
        {todos.map((todo, index) => {
          let taskStyle = {};
          if (todo.status === "未着手") {
            taskStyle = "status-not-started-yet-task-style";
          } else if (todo.status === "進行中") {
            taskStyle = "status-in-progress-task-style";
          } else {
            taskStyle = "status-complete-task-style";
          }
          if (todo.editFlg === ON_EDIT_FLG_TRUE) {
            return (
              <li key={index} style={{ listStyle: "none" }}>
                <div className={taskStyle}>
                  <p className="task-id-style">{todo.id}</p>
                  <input
                    id={`task-${todo.id}-title`}
                    type="text"
                    className="add-input-style"
                    defaultValue={todo.title}
                    placeholder="タイトル"
                    maxLength="10"
                    onChange={onChangeEditTaskTitleText}
                  />
                  <select
                    id={`task-${todo.id}-status`}
                    className="task-status-style"
                    value={todo.status}
                    onChange={() => {
                      onChangeExistingTaskStatus(
                        todo.id,
                        document.getElementById(`task-${todo.id}-status`).value
                      );
                    }}
                  >
                    <option value="未着手">未着手</option>
                    <option value="進行中">進行中</option>
                    <option value="完了">完了</option>
                  </select>
                  <input
                    id={`task-${todo.id}-detail`}
                    type="text"
                    className="add-input-detail-style"
                    defaultValue={todo.detail}
                    placeholder="タスク詳細"
                    maxLength="50"
                    onChange={onChangeEditTaskDetailText}
                  />
                  <p className="task-date-style">期限：{todo.date}</p>
                  <p className="task-created-at-style">
                    作成日：{todo.createdAt}
                  </p>
                  <button
                    type="button"
                    className="task-delete-button-style"
                    onClick={() => {
                      onClickUpdateTask(todo.id);
                    }}
                  >
                    確定
                  </button>
                  <button
                    type="button"
                    className="task-delete-button-style"
                    onClick={() => {
                      onClickBackEdit(todo.id);
                    }}
                  >
                    戻す
                  </button>
                </div>
              </li>
            );
          } else {
            return (
              <li key={index} style={{ listStyle: "none" }}>
                <div className={taskStyle}>
                  <p className="task-id-style">{todo.id}</p>
                  <p id={`task-${todo.id}-title`} className="task-title-style">
                    {todo.title}
                  </p>
                  <select
                    id={`task-${todo.id}-status`}
                    className="task-status-style"
                    value={todo.status}
                    onChange={() => {
                      onChangeExistingTaskStatus(
                        todo.id,
                        document.getElementById(`task-${todo.id}-status`).value
                      );
                    }}
                  >
                    <option value="未着手">未着手</option>
                    <option value="進行中">進行中</option>
                    <option value="完了">完了</option>
                  </select>
                  <p
                    id={`task-${todo.id}-detail`}
                    className="task-detail-style"
                  >
                    {todo.detail}
                  </p>
                  <p className="task-date-style">期限：{todo.date}</p>
                  <p className="task-created-at-style">
                    作成日：{todo.createdAt}
                  </p>
                  <button
                    type="button"
                    className="task-delete-button-style"
                    onClick={() => {
                      onClickDelete(todo.id);
                    }}
                  >
                    削除
                  </button>
                  <button
                    type="button"
                    className="task-delete-button-style"
                    onClick={() => {
                      onClickEdit(todo.id);
                    }}
                  >
                    編集
                  </button>
                  <div>
                    <button
                      id={todo.id}
                      className="task-delete-button-style"
                      onClick={onClickOpenComment}
                    >
                      コメント
                    </button>
                    <Modal isOpen={modalIsOpen}>
                      <button onClick={() => setIsOpen(false)}>閉じる</button>
                      <div>
                        <input
                          type="text"
                          value={commentContentText}
                          onChange={onChangeCommentContentText}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            onClickAddComment(activeCommentParent);
                          }}
                        >
                          コメントする
                        </button>
                      </div>
                      <h2>コメント一覧</h2>
                      {comments.map((comment, index) => {
                        return (
                          <div>
                            {activeCommentParent === comment.parentId && (
                              <>
                                <p>{comment.content}</p>
                                <hr />
                              </>
                            )}
                          </div>
                        );
                      })}
                    </Modal>
                  </div>
                </div>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};
