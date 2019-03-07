import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const GET_USERS = 'GET_USERS';
export const SET_USERS = 'SET_USERS';


export class GetUsers implements Action {

    readonly type = GET_USERS;
    
    constructor(public payload: { id: number, password: string}) { }
}

export class SetUsers implements Action {
    readonly type = SET_USERS;

    constructor(public payload: any) {}
}

export type UserActions = GetUsers | SetUsers;
