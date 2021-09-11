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
    }
    const taskIdStyle = {
      paddingRight: '24px'
    }
    const taskTitleStyle = {
      minWidth: '160px',
      paddingRight: '24px'
    }
    const taskStatusStyle = {
      paddingRight: '24px'
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
    const taskObj = {
      title: taskTitleText,
      status: taskStatus,
      detail: taskDetailText
    }
    const newTask = [...todos, taskObj];
    setTodos(newTask);
    setTaskTitleText('');
    setTaskDetailText('');
    setTaskStatus('');
  };

  return (
    <div className="App" style={appStyle}>
      <div style={addStyle}>
        <form action="">
          <input style={addInputStyle} type="text" value={taskTitleText} onChange={onChangeTaskTitleText} />
          <select style={addInputStyle} name="" id="" value={taskStatus} onChange={onChangeTaskStatus}>
            <option value="">-</option>
            <option value="未着手">未着手</option>
            <option value="進行中">進行中</option>
            <option value="完了">完了</option>
          </select>
          <input style={addInputDetailStyle} type="text" value={taskDetailText} onChange={onChangeTaskDetailText} />
          <button type="button" style={addButtonStyle} onClick={onClickAdd}>追加</button>
        </form>
      </div>
      <div>
        <ul>
          <li>
            <div style={taskStyle}>
              <p style={taskIdStyle}>1</p>
              <p style={taskTitleStyle}>掃除１０文字まで制限</p>
              <p style={taskStatusStyle}>未着手</p>
              <p style={taskDetailStyle}>風呂に水垢があるので綺麗にする風呂に水垢があるので綺麗にするデザイン崩れないよう５０文字５０文字までま</p>
              <button type="button" style={taskDeleteButtonStyle}>削除</button>
            </div>
          </li>
          <li>
            <div style={taskStyle}>
              <p style={taskIdStyle}>2</p>
              <p style={taskTitleStyle}>あ</p>
              <p style={taskStatusStyle}>完了</p>
              <p style={taskDetailStyle}>あ</p>
              <button type="button" style={taskDeleteButtonStyle}>削除</button>
            </div>
          </li>
          {todos.map((todo, index)=>{
              return(
                <li key={index+1}>
                  <div style={taskStyle}>
                    <p style={taskIdStyle}>{index+1}</p>
                    <p style={taskTitleStyle}>{todo.title}</p>
                    <p style={taskStatusStyle}>{todo.status}</p>
                    <p style={taskDetailStyle}>{todo.detail}</p>
                    <button type="button" style={taskDeleteButtonStyle}>削除</button>
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
