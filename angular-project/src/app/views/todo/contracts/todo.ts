import { Observable } from 'rxjs';
import { Todo } from 'src/app/bloc/models/task';

export interface TodoService {

  todos$: Observable<Todo[]>;

  /// Ajoute une tâche à notre base de donnée des tâches
  create(task: Partial<Todo>): Observable<boolean>;

  /// Modifier une tâche dans notre base de donnée des tâches
  update(id: number | string, todo: Partial<Todo>): Observable<boolean>;

  /// Supprimer une tâche dans notre base de donnée des tâches
  delete(id: number | string): Observable<boolean>;
}
