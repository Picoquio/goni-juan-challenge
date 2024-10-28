// user.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUserRoles = createSelector(
  selectUserState,
  (state: UserState) => state.roles
);
