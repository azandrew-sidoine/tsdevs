export interface Todo {
  id: number;
  label: string;
  completed: boolean;
  createdAt: string | Date;
  completedAt: string | Date | undefined;
}
