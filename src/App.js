import React, {useState} from 'react';

export const App = () => {
    // css
    const appStyle = {
      width: '1240px'
    }
    const addStyle = {
      padding: '16px',
      margin: '16px'
    }
    const sortButtonAreaStyle = {
      padding: '16px',
      margin: '16px'
    }
    const addButtonStyle = {
      padding: '16px',
      borderRadius: '12px'
    }
    const addInputStyle = {
      padding: '16px',
      marginRight: '16px',
      borderRadius: '12px'
    }
    const addInputDetailStyle = {
      width: '600px',
      padding: '16px',
      marginRight: '16px',
      borderRadius: '12px'
    }
    const taskIdStyle = {
      paddingLeft: '12px',
      paddingRight: '24px'
    }
    const taskTitleStyle = {
      minWidth: '160px',
      paddingRight: '24px'
    }
    const taskStatusStyle = {
      padding: '16px',
      marginRight: '16px',
      borderRadius: '12px'
    }
    const taskDetailStyle = {
      minWidth: '300px',
      maxWidth: '600px'
    }
    const taskDeleteButtonStyle = {
      padding: '16px',
      borderRadius: '12px'
    }
    const sortButtonStyle = {
      padding: '16px',
      borderRadius: '12px',
      marginRight: '16px'
    }
    const statusCompleteTaskStyle = {
      display: 'flex',
      marginBottom: '24px',
      borderRadius: '12px',
      backgroundColor: 'darkgray'
    }
    const statusInProgressTaskStyle = {
      display: 'flex',
      marginBottom: '24px',
      borderRadius: '12px',
      backgroundColor: 'lightgreen'
    }
    const statusNotStartedYetTaskStyle = {
      display: 'flex',
      marginBottom: '24px',
      borderRadius: '12px',
      backgroundColor: 'white'
    }

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
    const newTask = [...todos, taskObj];
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
    <div className="App" style={appStyle}>
      <div style={addStyle}>
        <form action="">
          <input style={addInputStyle} type="text" value={taskTitleText} onChange={onChangeTaskTitleText} maxLength='10' />
          <select style={addInputStyle} name="" id="" value={taskStatus} onChange={onChangeTaskStatus}>
            <option value="">-</option>
            <option value="未着手">未着手</option>
            <option value="進行中">進行中</option>
            <option value="完了">完了</option>
          </select>
          <input style={addInputDetailStyle} type="text" value={taskDetailText} onChange={onChangeTaskDetailText} maxLength='50' />
          <button type="button" style={addButtonStyle} onClick={onClickAdd}>追加</button>
        </form>
      </div>
      <div className="sortButtons" style={sortButtonAreaStyle}>
        <button style={sortButtonStyle} onClick={sortByIdDescending}>id降順</button>
        <button style={sortButtonStyle} onClick={sortByIdAscending}>id昇順</button>
        <button style={sortButtonStyle} onClick={sortByStatusAscending}>ステータス順 進行中->未着手->完了</button>
      </div>
      <div>
        <button onClick={filterDisable}>フィルター無し</button>
        <button onClick={filterProgress}>進行中</button>
        <button onClick={filterNotYet}>未着手</button>
        <button onClick={filterComplete}>完了</button>
      </div>
      <div>
        <ul>
          {todos.map((todo, index)=>{
              let taskStyle = {};
              if (todo.status === "未着手") {
                taskStyle = statusNotStartedYetTaskStyle;
              } else if (todo.status === "進行中") {
                taskStyle = statusInProgressTaskStyle;
              } else {
                taskStyle = statusCompleteTaskStyle;
              }
              return(
                <li key={index} style={{listStyle: 'none'}}>
                  <div style={taskStyle}>
                    <p style={taskIdStyle}>{todo.id}</p>
                    <p style={taskTitleStyle}>{todo.title}</p>
                    <select 
                      id={`task-${todo.id}-status`} 
                      style={taskStatusStyle} 
                      value={todo.status} onChange={() => {onChangeExistingTaskStatus(todo.id, document.getElementById(`task-${todo.id}-status`).value)}}
                    >
                      <option value="未着手">未着手</option>
                      <option value="進行中">進行中</option>
                      <option value="完了">完了</option>
                    </select>
                    <p style={taskDetailStyle}>{todo.detail}</p>
                    <button type="button" style={taskDeleteButtonStyle} onClick={() => {onClickDelete(todo.id)}} >削除</button>
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
