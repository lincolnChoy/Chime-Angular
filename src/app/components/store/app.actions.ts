import { Action } from '@ngrx/store';

export const LOGOUT = 'LOGOUT';

export class Logout implements Action {

    readonly type = LOGOUT;
}

export type AppActions = Logout;