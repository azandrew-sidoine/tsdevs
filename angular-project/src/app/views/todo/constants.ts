import { InjectionToken } from "@angular/core";
import { TodoService } from "./contracts/todo";

export const TODO_SERVICE = new InjectionToken<TodoService>(
  'TODO SERVICE INSTANCE',
);
