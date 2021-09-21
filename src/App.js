import React, {useState} from 'react';

import './App.css'
import { AddForm } from './components/AddForm';
import { SortButton } from './components/SortButton';
import { FilterButton } from './components/FilterButton';
import { TaskArea } from './components/TaskArea';
import "react-datepicker/dist/react-datepicker.css";
// import Modal from 'react-modal';

// Modal.setAppElement("#root");

export const App = () => {
  // js処理
  const [id, setId] = useState(1);
  const [taskTitleText, setTaskTitleText] = useState('');
  const [taskDetailText, setTaskDetailText] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [todos, setTodos] = useState([]);
  const [todosStorage, setTodosStrage] = useState([]);
  const initialDate = new Date()
  const [date, setDate] = useState(initialDate);
  const ON_EDIT_FLG_TRUE = 1;
  const ON_EDIT_FLG_FALSE = 0;
  const [taskEditTitleText, setTaskEditTitleText] = useState('');
  const [taskEditDetailText, setTaskEditDetailText] = useState('');
  // const [modalIsOpen, setIsOpen] = React.useState(false);

  const onChangeTaskTitleText = (event) => setTaskTitleText(event.target.value);
  const onChangeTaskDetailText = (event) => setTaskDetailText(event.target.value);
  const onChangeTaskStatus = (event) => setTaskStatus(event.target.value);
  const handleChange = (event) => {
    setDate(event);
  }
  const onClickAdd = () => {
    if (taskTitleText === "" || taskStatus === "" || taskDetailText === "" || date === null ){
      return
    };
    const newId = id + 1;
    const yyyymmdd = date.getFullYear() + "/" +  (date.getMonth() + 1) + "/"+ date.getDate();
    const createdAt = new Date()
    const createdAtYyyymmdd = createdAt.getFullYear() + "/" +  (createdAt.getMonth() + 1) + "/"+ createdAt.getDate();
    const taskObj = {
      id: id,
      title: taskTitleText,
      status: taskStatus,
      detail: taskDetailText,
      date: yyyymmdd,
      createdAt: createdAtYyyymmdd,
      editFlg: ON_EDIT_FLG_FALSE
    }
    setId(newId);
    const newTask = [...todosStorage, taskObj];
    setTodos(newTask);
    setTodosStrage(newTask);
    setTaskTitleText('');
    setTaskDetailText('');
    setTaskStatus('');
  };

  const onClickDelete = (deleteTodoId) => {
    const newTodos = [...todos];
    for (let i = 0; i < newTodos.length; i++) {
      if(newTodos[i].id === deleteTodoId){
        newTodos.splice(i, 1);
      }
    }
    setTodos(newTodos);
    setTodosStrage(newTodos);
  };

  const onClickEdit = (editTodoId) => {
    const newTodos = [...todos];
    for (let i = 0; i < newTodos.length; i++) {
        if(newTodos[i].id === editTodoId){
            newTodos[i].editFlg = ON_EDIT_FLG_TRUE;
        }
    }
    setTodos(newTodos);
  };

  const onChangeEditTaskTitleText = (event) => {
    setTaskEditTitleText(event.target.value)
  };
  const onChangeEditTaskDetailText = (event) => {
    setTaskEditDetailText(event.target.value)
  }

  const onClickUpdateTask = (updateTodoId) => {
    if (taskEditTitleText === ""){
      var defaultTaskEditTitleText = document.getElementById(`task-${updateTodoId}-title`).value
    };
    if (taskEditDetailText === ""){
      var defaultTaskEditDetailText = document.getElementById(`task-${updateTodoId}-detail`).value
    };
    if (taskEditTitleText === "" && defaultTaskEditTitleText === ""){
      return
    }
    if (taskEditDetailText === "" && defaultTaskEditDetailText === ""){
      return
    }

    const newTodos = [...todos];
    for (let i = 0; i < newTodos.length; i++) {
      if(newTodos[i].id === updateTodoId){
          if(taskEditTitleText){
            newTodos[i].title = taskEditTitleText;
          }else{
            newTodos[i].title = defaultTaskEditTitleText;
          }
          if(taskEditDetailText){
            newTodos[i].detail = taskEditDetailText;
          }else{
            newTodos[i].detail = defaultTaskEditDetailText;
          }
          newTodos[i].editFlg = ON_EDIT_FLG_FALSE;
      }
    }
    setTaskEditTitleText('');
    setTaskEditDetailText('');
    setTodos(newTodos);
    setTodosStrage(newTodos);
  };

  const onClickBackEdit = (editBackTodoId) => {
    const newTodos = [...todos];
    for (let i = 0; i < newTodos.length; i++) {
        if(newTodos[i].id === editBackTodoId){
            newTodos[i].editFlg = ON_EDIT_FLG_FALSE;
        }
    }
    setTodos(newTodos);
  };

  const onChangeExistingTaskStatus = (statusChangeTodoId, setValue) => {
    const newTodos = [...todos];
    for (let i = 0; i < newTodos.length; i++) {
      if(newTodos[i].id === statusChangeTodoId){
        newTodos[i].status = setValue;
      }
    }
    setTodos(newTodos);
  };

  const sortByIdAscending = () => {
    let newTodos = [...todos];
    newTodos = newTodos.sort((a, b) => a.id - b.id);
    setTodos(newTodos);
  }

  const sortByIdDescending = () => {
    let newTodos = [...todos];
    newTodos = newTodos.sort((a, b) => b.id - a.id);
    setTodos(newTodos);
  }

  const sortByStatusAscending = () => {
    let newTodos = [...todos];
    const completeArray = newTodos.filter(item => item.status === '完了');
    const progressArray = newTodos.filter(item => item.status === '進行中');
    const notYetArray = newTodos.filter(item => item.status === '未着手');
    newTodos = progressArray.concat(notYetArray, completeArray);
    setTodos(newTodos);
  }

  const filterDisable = () => {
    const newTodos = [...todosStorage];
    setTodos(newTodos);
  }

  const filterProgress = () => {
    const newTodos = [...todosStorage];
    const progressArray = newTodos.filter(item => item.status === '進行中');
    setTodos(progressArray);
  }

  const filterNotYet = () => {
    const newTodos = [...todosStorage];
    const notYetArray = newTodos.filter(item => item.status === '未着手');
    setTodos(notYetArray);
  }

  const filterComplete = () => {
    const newTodos = [...todosStorage];
    const completeArray = newTodos.filter(item => item.status === '完了');
    setTodos(completeArray);
  }

  return (
    <div className="App app-style">
      {/* <div className="App">
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <Modal isOpen={modalIsOpen}>
          <button onClick={() => setIsOpen(false)}>Close Modal</button>
          <h2>タイトル</h2>
          <input type="text"/>
          <button>ボタン</button>
        </Modal>
      </div> */}
      <AddForm
        taskTitleText={taskTitleText}
        onChangeTaskTitleText={onChangeTaskTitleText}
        taskStatus={taskStatus}
        onChangeTaskStatus={onChangeTaskStatus}
        taskDetailText={taskDetailText}
        onChangeTaskDetailText={onChangeTaskDetailText}
        onClickAdd={onClickAdd}
        date={date}
        handleChange={handleChange}
      />
      <SortButton
        sortByIdDescending={sortByIdDescending}
        sortByIdAscending={sortByIdAscending}
        sortByStatusAscending={sortByStatusAscending}
      />
      <FilterButton
        filterDisable={filterDisable}
        filterProgress={filterProgress}
        filterNotYet={filterNotYet}
        filterComplete={filterComplete}
      />
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
      />
    </div>
  );
}

export default App;
