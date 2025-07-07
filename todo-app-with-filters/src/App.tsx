import { useState } from 'react';
import { useTodoStore } from './store/todoStore';
import { TodoItem } from './components/TodoItem';
import { TodoFilters } from './components/TodoFilters';
import type { Todo } from './types';

// Функция для фильтрации задач по выбранному фильтру
const filterTodos = (todos: Todo[], filter: string): Todo[] => {
  if (filter === 'active') return todos.filter((t) => !t.completed); // Только невыполненные
  if (filter === 'completed') return todos.filter((t) => t.completed); // Только выполненные
  return todos; // Все задачи
};

function App() {
  // Локальное состояние для текста новой задачи
  const [text, setText] = useState('');
  // Получаем задачи, фильтр и функцию добавления из Zustand store
  const todos = useTodoStore((state) => state.todos);
  const filter = useTodoStore((state) => state.filter);
  const addTodo = useTodoStore((state) => state.addTodo);

  // Обработка отправки формы (добавление новой задачи)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Не даём странице перезагрузиться
    if (text.trim() === '') return; // Не добавляем пустую задачу
    addTodo(text); // Добавляем задачу
    setText(''); // Очищаем поле ввода
  };

  // Получаем задачи, которые нужно показать (с учётом фильтра)
  const visibleTodos = filterTodos(todos, filter);

  return (
    // Основной контейнер приложения
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded">
      {/* Заголовок приложения */}
      <h1 className="text-2xl font-bold text-center mb-4">Todo App</h1>

      {/* Форма для добавления новой задачи */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)} // Обновляем текст при вводе
          placeholder="Add todo..."
          className="flex-1 border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>

      {/* Список задач */}
      <ul>
        {visibleTodos.map((todo) => (
          // Для каждой задачи рендерим компонент TodoItem
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>

      {/* Компонент фильтров */}
      <TodoFilters />
    </div>
  );
}

export default App;
