import React, { useState, useEffect } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./api";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    getTodos().then(res => setTodos(res.data));
  }, []);

  const addTodo = () => {
    if (!newTitle.trim()) return;
    createTodo({ title: newTitle }).then(res => {
      setTodos([...todos, res.data]);
      setNewTitle("");
    });
  };

  const toggleComplete = (todo) => {
    updateTodo(todo.id, { ...todo, completed: !todo.completed })
      .then(res => setTodos(todos.map(t => t.id === todo.id ? res.data : t)));
  };

  const removeTodo = (id) => {
    deleteTodo(id).then(() => setTodos(todos.filter(t => t.id !== id)));
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="form">
        <input
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          placeholder="Enter todo title"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.completed ? "line-through" : "" }}>
              {todo.title}
            </span>
            <button onClick={() => toggleComplete(todo)}>
              {todo.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;