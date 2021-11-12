export interface Todo {
  id: number | string;
  label: string;
  completed: boolean;
  createdAt: string | Date;
  completedAt: string | Date | undefined;
}
