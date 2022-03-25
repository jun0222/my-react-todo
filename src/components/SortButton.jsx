import React from "react";

export const SortButton = (props) => {
  const { todos, setTodos } = props;
  const sortByIdAscending = () => {
    let newTodos = [...todos];
    newTodos = newTodos.sort((a, b) => a.id - b.id);
    setTodos(newTodos);
  };

  const sortByIdDescending = () => {
    let newTodos = [...todos];
    newTodos = newTodos.sort((a, b) => b.id - a.id);
    setTodos(newTodos);
  };

  const sortByStatusAscending = () => {
    let newTodos = [...todos];
    const completeArray = newTodos.filter((item) => item.status === "完了");
    const progressArray = newTodos.filter((item) => item.status === "進行中");
    const notYetArray = newTodos.filter((item) => item.status === "未着手");
    newTodos = progressArray.concat(notYetArray, completeArray);
    setTodos(newTodos);
  };
  return (
    <div className="sortButtons sort-button-area-style">
      <button className="sort-button-style" onClick={sortByIdDescending}>
        id降順
      </button>
      <button className="sort-button-style" onClick={sortByIdAscending}>
        id昇順
      </button>
      <button className="sort-button-style" onClick={sortByStatusAscending}>
        ステータス順 進行中→未着手→完了
      </button>
    </div>
  );
};
