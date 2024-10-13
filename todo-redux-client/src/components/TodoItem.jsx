import React from 'react';
import { useDispatch } from 'react-redux';
import { updateTodo, deleteTodo } from '../features/todos/todoSlice';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(updateTodo({ ...todo, completed: !todo.completed }));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo._id));
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded shadow-md my-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="mr-4"
        />
        <span className={todo.completed ? "line-through text-gray-400" : ""}>
          {todo.title}
        </span>
      </div>
      <button
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
