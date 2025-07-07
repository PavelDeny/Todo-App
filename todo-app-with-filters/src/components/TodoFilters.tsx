import { useTodoStore } from '../store/todoStore';
import type { Filter } from '../types';

// Список возможных фильтров для задач
const filters: Filter[] = ['all', 'active', 'completed'];

// Компонент для отображения и выбора фильтра задач
export const TodoFilters = () => {
  // Получаем текущий фильтр и функцию для его изменения из Zustand store
  const currentFilter = useTodoStore((state) => state.filter);
  const setFilter = useTodoStore((state) => state.setFilter);

  return (
    // Контейнер для кнопок фильтров
    <div className="flex gap-2 justify-center mt-4">
      {/* Для каждого фильтра создаём отдельную кнопку */}
      {filters.map((filter) => (
        <button
          key={filter} // Уникальный ключ для React
          onClick={() => setFilter(filter)} // При клике меняем фильтр
          className={`px-3 py-1 rounded ${ currentFilter === filter ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700' }`}
        >
          {filter} {/* Название фильтра (all, active, completed) */}
        </button>
      ))}
    </div>
  );
}; 