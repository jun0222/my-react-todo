import React, {useState} from 'react';

import './App.css'
import { AddForm } from './components/AddForm';
import { SortButton } from './components/SortButton';
import { FilterButton } from './components/FilterButton';
import { TaskArea } from './components/TaskArea';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

  const onChangeTaskTitleText = (event) => setTaskTitleText(event.target.value);
  const onChangeTaskDetailText = (event) => setTaskDetailText(event.target.value);
  const onChangeTaskStatus = (event) => setTaskStatus(event.target.value);
  const handleChange = (event) => {
    setDate(event);
  }
  
  const onClickAdd = () => {
    if (taskTitleText === "" || taskStatus === "" || taskDetailText === "" ){
      return
    };
    const newId = id + 1;
    const yyyymmdd = date.getFullYear() + "/" +  (date.getMonth() + 1) + "/"+ date.getDate();
    const taskObj = {
      id: id,
      title: taskTitleText,
      status: taskStatus,
      detail: taskDetailText,
      date: yyyymmdd
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
      />
    </div>
  );
}

export default App;
