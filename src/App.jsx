import React, { useEffect, useState } from "react";
import { UserContextProvider } from "./usecontext/Usecontext";
import { Form, Item } from "./compo/index";

const App = () => {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos((oldTodo) => [{ id: Date.now(), ...todo }, ...oldTodo]);
  };

  const updateTodo = (id, todo) => {
    setTodos((oldTodo) =>
      oldTodo.map((oldTodo) => (oldTodo.id === id ? todo : oldTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((oldTodo) => oldTodo.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((oldTodo) =>
      oldTodo.map((oldTodoT) =>
        oldTodoT.id === id
          ? { ...oldTodoT, completed: !oldTodoT.completed }
          : oldTodoT
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <UserContextProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#3a2d3d] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-2xl shadow-zinc-600  rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            TODO List
          </h1>
          <div className="mb-4">
            <Form />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <Item todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </UserContextProvider>
  );
};

export default App;
