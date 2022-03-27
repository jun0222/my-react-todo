import React from "react";

export const FilterButton = (props) => {
  // props
  const { setTodos, dbMock } = props;

  // filter関連
  const filterDisable = () => {
    const newTodos = [...dbMock];
    setTodos(newTodos);
  };

  const filterProgress = () => {
    const newTodos = [...dbMock];
    const progressArray = newTodos.filter((item) => item.status === "進行中");
    setTodos(progressArray);
  };

  const filterNotYet = () => {
    const newTodos = [...dbMock];
    const notYetArray = newTodos.filter((item) => item.status === "未着手");
    setTodos(notYetArray);
  };

  const filterComplete = () => {
    const newTodos = [...dbMock];
    const completeArray = newTodos.filter((item) => item.status === "完了");
    setTodos(completeArray);
  };

  // jsx
  return (
    <div className="filter-buton-area-style">
      <button className="filter-button-style" onClick={filterDisable}>
        フィルター無し
      </button>
      <button className="filter-button-style" onClick={filterProgress}>
        進行中
      </button>
      <button className="filter-button-style" onClick={filterNotYet}>
        未着手
      </button>
      <button className="filter-button-style" onClick={filterComplete}>
        完了
      </button>
    </div>
  );
};
