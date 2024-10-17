import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const TodoContext = createContext();

// TodoContext provider component
export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const uri ='http://localhost:6789/api/todos';

  // Fetch todos from the backend
  const fetchTodos = async () => {
    try {
      const response = await fetch(uri);
      const data = await response.json();
      setTodos(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Add a new todo
  const addTodo = async (title) => {
    try {
      const response = await fetch(uri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      const newTodo = await response.json();
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Update a todo
  const updateTodo = async (updatedTodo) => {
    try {
      await fetch(`${uri}/${updatedTodo._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await fetch(`${uri}/${id}`, {
        method: 'DELETE',
      });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Fetch todos on initial load
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider
      value={{ todos, loading, addTodo, updateTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
