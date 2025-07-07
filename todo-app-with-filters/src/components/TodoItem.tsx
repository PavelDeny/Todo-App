import type { Todo } from '../types';
import { useTodoStore } from '../store/todoStore';

// Пропсы компонента: принимает одну задачу
interface Props {
  todo: Todo;
}

// Компонент для отображения одной задачи
export const TodoItem = ({ todo }: Props) => {
  // Получаем функции для переключения и удаления задачи из Zustand store
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  return (
    // Один элемент списка задач
    <li className="flex items-center justify-between p-2 border-b">
      {/* Текст задачи. Клик — переключает статус выполнения */}
      <span
        onClick={() => toggleTodo(todo.id)}
        className={`cursor-pointer ${todo.completed ? 'line-through text-gray-400' : ''}`}
      >
        {todo.text}
      </span>
      {/* Кнопка удаления задачи */}
      <button onClick={() => removeTodo(todo.id)} className="text-red-500 font-bold">×</button>
    </li>
  );
}; 