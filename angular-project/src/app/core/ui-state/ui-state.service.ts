import { ReplaySubject } from "rxjs";
import { startWith } from "rxjs/operators";
import { UIState, UIStateType } from "./contracts/ui-state";
import { UIStateManager } from "./contracts/ui-state-service";

export class UIStateService implements UIStateManager {

  private _uiState$ = new ReplaySubject<UIState>(1);

  uiState$ = this._uiState$.asObservable().pipe(
    startWith({
      performingAction: false,
      message: undefined,
      type: undefined
    })
  );
  startAction(message: string): void {
    this._uiState$.next({
      performingAction: true,
      message, // message: message
      type: undefined
    });
  }
  endAction(type: UIStateType = UIStateType.OK, message?: string): void {
    this._uiState$.next({
      performingAction: false,
      message, // message: message
      type // type : type
    });
  }

}
