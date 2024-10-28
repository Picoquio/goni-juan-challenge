// user.actions.ts
import { createAction, props } from '@ngrx/store';

export const setUserRoles = createAction(
  '[User] Set User Roles',
  props<{ roles: string[] }>()
);
