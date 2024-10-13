import React, { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { todos, loading, addTodo } = useContext(TodoContext);
  const [title, setTitle] = useState('');

  const handleAddTodo = () => {
    if (title.trim()) {
      addTodo(title);
      setTitle('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Todo List</h1>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded py-2 px-4 w-3/4"
          placeholder="Enter a new todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Add
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded shadow-md">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : todos.length > 0 ? (
          todos.map((todo) => <TodoItem key={todo._id} todo={todo} />)
        ) : (
          <p className="text-center text-gray-500">No todos available</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
