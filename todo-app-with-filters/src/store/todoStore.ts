import { create } from 'zustand';
import type { Todo, Filter } from '../types';

// Описывает структуру состояния и методы для работы с задачами
interface TodoState {
  todos: Todo[]; // Список всех задач
  filter: Filter; // Текущий фильтр отображения задач
  addTodo: (text: string) => void; // Добавить новую задачу
  toggleTodo: (id: string) => void; // Переключить статус задачи (выполнено/не выполнено)
  removeTodo: (id: string) => void; // Удалить задачу
  setFilter: (filter: Filter) => void; // Установить фильтр
}

// Создаём Zustand store для управления задачами
export const useTodoStore = create<TodoState>((set) => ({
  todos: [], // Начальный список задач пустой
  filter: 'all', // Начальный фильтр — показывать все задачи
  // Добавить новую задачу
  addTodo: (text) =>
    set((state) => ({
      todos: [
        ...state.todos,
        { id: crypto.randomUUID(), text, completed: false }, // Создаём новую задачу с уникальным id
      ],
    })),
  // Переключить статус задачи (выполнено/не выполнено)
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo // Меняем только нужную задачу
      ),
    })),
  // Удалить задачу по id
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  // Установить фильтр
  setFilter: (filter) => set(() => ({ filter })),
})); 