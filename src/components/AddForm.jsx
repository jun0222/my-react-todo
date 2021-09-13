import React from 'react';

export const AddForm = (props) => {
    const {
        taskTitleText, 
        onChangeTaskTitleText, 
        taskStatus, 
        onChangeTaskStatus, 
        taskDetailText, 
        onChangeTaskDetailText, 
        onClickAdd
    } = props;
    return (
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
    )
}