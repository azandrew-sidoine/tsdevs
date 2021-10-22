import { InjectionToken } from "@angular/core";
import { UIStateManager } from "./contracts/ui-state-service";
import { UIStateService } from "./ui-state.service";

export const UI_STATE_MANAGER = new InjectionToken<UIStateManager>(
  'UI STATE MANAGER INSTANCE',
  {
    providedIn: 'root',
    factory: () => {
      return new UIStateService();
    }
  }
);
