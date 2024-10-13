import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo } from '../features/todos/todoSlice';
import TodoItem from './TodoItem';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const [title, setTitle] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (title.trim()) {
      dispatch(addTodo({ title }));
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
        {todos.length > 0 ? (
          todos.map((todo) => <TodoItem key={todo._id} todo={todo} />)
        ) : (
          <p className="text-center text-gray-500">No todos available</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
