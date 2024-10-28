// user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { setUserRoles } from './user.actions';
import { createRehydrateReducer } from './persistence';

export interface UserState {
  roles: string[];
}

export const initialState: UserState = {
  roles: [],
};


export const userReducer = createRehydrateReducer(
  "SOME_STORAGE_KEY",
  initialState,
  on(setUserRoles, (state, { roles }) => ({ ...state, roles }))
);

// export const userReducer = createReducer(
//   initialState,
//   on(setUserRoles, (state, { roles }) => ({ ...state, roles }))
// );
