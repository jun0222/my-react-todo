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
    const taskStyle = {
      display: 'flex',
      marginBottom: '24px'
    }
    const taskIdStyle = {
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

  // js処理
  const [id, setId] = useState(1);
  const [taskTitleText, setTaskTitleText] = useState('');
  const [taskDetailText, setTaskDetailText] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [todos, setTodos] = useState([]);

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
      <div>
        <ul>
          {todos.map((todo, index)=>{
              return(
                <li key={index}>
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
