// Тип фильтра для отображения задач: все, только активные или только завершённые
export type Filter = 'all' | 'active' | 'completed';

// Интерфейс одной задачи (todo)
export interface Todo {
  id: string;         // Уникальный идентификатор задачи
  text: string;       // Текст задачи
  completed: boolean; // Статус выполнения задачи
} 