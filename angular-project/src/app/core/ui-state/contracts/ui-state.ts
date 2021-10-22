export interface UIState {
  performingAction: boolean;
  message?: string;
  type?: UIStateType | number;
}

export enum UIStateType {
  OK = 200 | 201,
  ERROR = 500,
  WARNING = 400 || 422,
  NOT_FOUND = 404,
}
