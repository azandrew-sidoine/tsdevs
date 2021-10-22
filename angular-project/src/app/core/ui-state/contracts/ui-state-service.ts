import { Observable } from 'rxjs';
import { UIState, UIStateType } from './ui-state';

export interface UIStateManager {
  // Etat de la vue
  uiState$: Observable<UIState>;
  // Simule le début d'une action sur la vue
  startAction(message: string): void;
  // Simule la fin d'une action sur la vue
  endAction(type?: UIStateType, message?: string): void;
}
