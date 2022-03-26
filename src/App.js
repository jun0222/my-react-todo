import React, { useState } from "react";

import "./App.css";
import { AddForm } from "./components/AddForm";
import { SortButton } from "./components/SortButton";
import { FilterButton } from "./components/FilterButton";
import { TaskArea } from "./components/TaskArea";
import "react-datepicker/dist/react-datepicker.css";

export const App = () => {
  // state宣言関連
  const [id, setId] = useState(1);
  const [todos, setTodos] = useState([]);
  const [dbMock, setDbMock] = useState([]);
  const ON_EDIT_FLG_TRUE = 1;
  const ON_EDIT_FLG_FALSE = 0;
  const [taskEditTitleText, setTaskEditTitleText] = useState("");
  const [taskEditDetailText, setTaskEditDetailText] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [commentId, setCommentId] = useState(1);
  const [commentContentText, setCommentContentText] = useState("");
  const [comments, setComments] = useState([]);
  const [activeCommentParent, setActiveCommentParent] = useState();

  // onChange関連
  const onChangeCommentContentText = (event) =>
    setCommentContentText(event.target.value);

  const onChangeEditTaskTitleText = (event) => {
    setTaskEditTitleText(event.target.value);
  };
  const onChangeEditTaskDetailText = (event) => {
    setTaskEditDetailText(event.target.value);
  };
  const onChangeExistingTaskStatus = (statusChangeTodoId, setValue) => {
    const newTodos = [...todos];
    for (let i = 0; i < newTodos.length; i++) {
      if (newTodos[i].id === statusChangeTodoId) {
        newTodos[i].status = setValue;
      }
    }
    setTodos(newTodos);
  };

  // onClick関連
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

  const onClickEdit = (editTodoId) => {
    const newTodos = [...todos];
    for (let i = 0; i < newTodos.length; i++) {
      if (newTodos[i].id === editTodoId) {
        newTodos[i].editFlg = ON_EDIT_FLG_TRUE;
      }
    }
    setTodos(newTodos);
  };

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

  const onClickBackEdit = (editBackTodoId) => {
    const newTodos = [...todos];
    for (let i = 0; i < newTodos.length; i++) {
      if (newTodos[i].id === editBackTodoId) {
        newTodos[i].editFlg = ON_EDIT_FLG_FALSE;
      }
    }
    setTodos(newTodos);
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

  const onClickOpenComment = (event) => {
    setIsOpen(true);
    setActiveCommentParent(event.target.id);
  };

  return (
    <div className="App app-style">
      <AddForm
        id={id}
        setId={setId}
        setTodos={setTodos}
        dbMock={dbMock}
        setDbMock={setDbMock}
        ON_EDIT_FLG_FALSE={ON_EDIT_FLG_FALSE}
      />
      <SortButton todos={todos} setTodos={setTodos} />
      <FilterButton setTodos={setTodos} dbMock={dbMock} />
      <TaskArea
        todos={todos}
        onChangeExistingTaskStatus={onChangeExistingTaskStatus}
        onClickDelete={onClickDelete}
        ON_EDIT_FLG_TRUE={ON_EDIT_FLG_TRUE}
        onClickEdit={onClickEdit}
        onClickBackEdit={onClickBackEdit}
        onChangeEditTaskTitleText={onChangeEditTaskTitleText}
        onChangeEditTaskDetailText={onChangeEditTaskDetailText}
        onClickUpdateTask={onClickUpdateTask}
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        comments={comments}
        onClickAddComment={onClickAddComment}
        commentContentText={commentContentText}
        onChangeCommentContentText={onChangeCommentContentText}
        onClickOpenComment={onClickOpenComment}
        activeCommentParent={activeCommentParent}
      />
    </div>
  );
};

export default App;
