import React from "react";

const TodosContext = React.createContext({
  todos: [
    // { id: 1, text: "Read Books", complete: false },
  ],
  currentTodo: {}
});

export default TodosContext;
