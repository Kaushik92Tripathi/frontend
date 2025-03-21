'use client';

import { useEffect, useState } from 'react';
import { getTodos, Todo } from '@/lib/api';
import TodoItem from '@/components/TodoItem';
import TodoForm from '@/components/TodoForm';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos. Is the backend server running?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Todo App</h1>
      
      <TodoForm onAdd={fetchTodos} />
      
      {loading ? (
        <div className="text-center">Loading todos...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4">Your Tasks</h2>
          {todos.length === 0 ? (
            <div className="text-center text-gray-500">No todos yet. Add one above!</div>
          ) : (
            todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onUpdate={fetchTodos} />
            ))
          )}
        </div>
      )}
    </main>
  );
}