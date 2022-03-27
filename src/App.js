import React, { useState } from "react";

import "./App.css";
import { AddForm } from "./components/AddForm";
import { SortButton } from "./components/SortButton";
import { FilterButton } from "./components/FilterButton";
import { TaskArea } from "./components/TaskArea";
import "react-datepicker/dist/react-datepicker.css";

export const App = () => {
  // state宣言関連
  const [id, setId] = useState(1);
  const [todos, setTodos] = useState([]);
  const [dbMock, setDbMock] = useState([]);
  const ON_EDIT_FLG_TRUE = 1;
  const ON_EDIT_FLG_FALSE = 0;

  return (
    <div className="App app-style">
      <AddForm
        id={id}
        setId={setId}
        setTodos={setTodos}
        dbMock={dbMock}
        setDbMock={setDbMock}
        ON_EDIT_FLG_FALSE={ON_EDIT_FLG_FALSE}
      />
      <SortButton todos={todos} setTodos={setTodos} />
      <FilterButton setTodos={setTodos} dbMock={dbMock} />
      <TaskArea
        id={id}
        todos={todos}
        setTodos={setTodos}
        ON_EDIT_FLG_TRUE={ON_EDIT_FLG_TRUE}
        ON_EDIT_FLG_FALSE={ON_EDIT_FLG_FALSE}
        setDbMock={setDbMock}
      />
    </div>
  );
};

export default App;
