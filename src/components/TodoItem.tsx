import { Todo, updateTodo, deleteTodo } from '@/lib/api';
import { useState } from 'react';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

interface TodoItemProps {
  todo: Todo;
  onUpdate: () => void;
}

export default function TodoItem({ todo, onUpdate }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleToggleComplete = async () => {
    await updateTodo(todo.id, { ...todo, completed: !todo.completed });
    onUpdate();
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
    onUpdate();
  };

  const handleSave = async () => {
    await updateTodo(todo.id, { title, description });
    setEditing(false);
    onUpdate();
  };

  return (
    <div className="border p-4 rounded-md my-2 bg-white shadow-sm">
      {editing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
            rows={2}
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white p-2 rounded-md flex items-center"
            >
              <FaCheck className="mr-1" /> Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-500 text-white p-2 rounded-md flex items-center"
            >
              <FaTimes className="mr-1" /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h3
                className={`text-lg font-semibold ${
                  todo.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {todo.title}
              </h3>
              <p className="text-gray-600">{todo.description}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(todo.created_at).toLocaleString()}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleToggleComplete}
                className={`p-2 rounded-md ${
                  todo.completed ? 'bg-yellow-500' : 'bg-green-500'
                } text-white`}
              >
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                <FaEdit />
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}