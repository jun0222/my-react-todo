import React, {useState} from 'react';

import './App.css'

export const App = () => {
  // js処理
  const [id, setId] = useState(1);
  const [taskTitleText, setTaskTitleText] = useState('');
  const [taskDetailText, setTaskDetailText] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [todos, setTodos] = useState([]);
  const [todosStorage, setTodosStrage] = useState([]);

  const onChangeTaskTitleText = (event) => setTaskTitleText(event.target.value);
  const onChangeTaskDetailText = (event) => setTaskDetailText(event.target.value);
  const onChangeTaskStatus = (event) => setTaskStatus(event.target.value);
  
  const onClickAdd = () => {
    if (taskTitleText === "" || taskStatus === "" || taskDetailText === "" ){
      return
    };
    const newId = id + 1;
    const taskObj = {
      id: id,
      title: taskTitleText,
      status: taskStatus,
      detail: taskDetailText
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
      <div className="add-style">
        <form action="">
          <input className="add-input-style" type="text" value={taskTitleText} onChange={onChangeTaskTitleText} maxLength='10' />
          <select className="add-input-style" name="" id="" value={taskStatus} onChange={onChangeTaskStatus}>
            <option value="">-</option>
            <option value="未着手">未着手</option>
            <option value="進行中">進行中</option>
            <option value="完了">完了</option>
          </select>
          <input className="add-input-detail-style" type="text" value={taskDetailText} onChange={onChangeTaskDetailText} maxLength='50' />
          <button type="button" className="add-button-style" onClick={onClickAdd}>追加</button>
        </form>
      </div>
      <div className="sortButtons sort-button-area-style">
        <button className="sort-button-style" onClick={sortByIdDescending}>id降順</button>
        <button className="sort-button-style" onClick={sortByIdAscending}>id昇順</button>
        <button className="sort-button-style" onClick={sortByStatusAscending}>ステータス順 進行中->未着手->完了</button>
      </div>
      <div className="filter-buton-area-style">
        <button className="filter-button-style" onClick={filterDisable}>フィルター無し</button>
        <button className="filter-button-style" onClick={filterProgress}>進行中</button>
        <button className="filter-button-style" onClick={filterNotYet}>未着手</button>
        <button className="filter-button-style" onClick={filterComplete}>完了</button>
      </div>
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
                    <button type="button" className="task-delete-button-style" onClick={() => {onClickDelete(todo.id)}} >削除</button>
                  </div>
                </li>
              );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
