import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "../../src/App.css";

export const AddForm = (props) => {
  // state宣言
  const [taskStatus, setTaskStatus] = useState("");
  const [taskTitleText, setTaskTitleText] = useState("");
  const [taskDetailText, setTaskDetailText] = useState("");
  const initialDate = new Date();
  const [date, setDate] = useState(initialDate);

  // onChange関連
  const onChangeTaskTitleText = (event) => setTaskTitleText(event.target.value);
  const onChangeTaskDetailText = (event) =>
    setTaskDetailText(event.target.value);
  const handleChange = (event) => {
    setDate(event);
  };
  const onChangeTaskStatus = (event) => setTaskStatus(event.target.value);

  // onClick関連
  const onClickAdd = () => {
    if (
      taskTitleText === "" ||
      taskStatus === "" ||
      taskDetailText === "" ||
      date === null
    ) {
      return;
    }
    const newId = id + 1;
    const yyyymmdd =
      date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    const createdAt = new Date();
    const createdAtYyyymmdd =
      createdAt.getFullYear() +
      "/" +
      (createdAt.getMonth() + 1) +
      "/" +
      createdAt.getDate();
    const taskObj = {
      id: id,
      title: taskTitleText,
      status: taskStatus,
      detail: taskDetailText,
      date: yyyymmdd,
      createdAt: createdAtYyyymmdd,
      editFlg: ON_EDIT_FLG_FALSE,
    };
    setId(newId);
    const newTask = [...dbMock, taskObj];
    setTodos(newTask);
    setDbMock(newTask);
    setTaskTitleText("");
    setTaskDetailText("");
    setTaskStatus("");
  };
  const { id, setId, setTodos, dbMock, setDbMock, ON_EDIT_FLG_FALSE } = props;
  return (
    <div className="add-style">
      <form action="">
        <input
          className="add-input-style"
          type="text"
          value={taskTitleText}
          onChange={onChangeTaskTitleText}
          maxLength="10"
          placeholder="タイトルを入力"
        />
        <select
          className="add-input-style"
          name=""
          id=""
          value={taskStatus}
          onChange={onChangeTaskStatus}
        >
          <option value="">-</option>
          <option value="未着手">未着手</option>
          <option value="進行中">進行中</option>
          <option value="完了">完了</option>
        </select>
        <input
          className="add-input-detail-style"
          type="text"
          value={taskDetailText}
          onChange={onChangeTaskDetailText}
          maxLength="50"
          placeholder="タスクの詳細を入力"
        />
        <div className="datepiker-wrap">
          <label>期限を入力</label>
          <DatePicker
            selected={date}
            onChange={handleChange}
            className="datepiker-input-style"
            dateFormat="yyyy/MM/dd"
          />
        </div>
        <button type="button" className="add-button-style" onClick={onClickAdd}>
          追加
        </button>
      </form>
    </div>
  );
};
