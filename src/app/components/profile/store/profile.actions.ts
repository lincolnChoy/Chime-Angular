import { Action } from '@ngrx/store';

export const GET_PROFILE = 'GET_PROFILE';
export const LOAD_PROFILE = 'LOAD_PROFILE';
export const CLEAR_PROFILE = 'CLEAR_PROFILE';
export const SAVE_PROFILE = 'SAVE_PROFILE';
export const SET_RESPONSE = 'SET_RESPONSE';

export class GetProfile implements Action {

    readonly type = GET_PROFILE;

    constructor(public payload : number) {}
}


export class LoadProfile implements Action {

    readonly type = LOAD_PROFILE;

    constructor(public payload : any) {}
}

export class SaveProfile implements Action {
    
    readonly type = SAVE_PROFILE;

    constructor(public payload: { id: string, pw: string, picture: string, birthday: string, location: string, occupation: string, blurb: string}) { }
}

export class ClearProfile implements Action {
    readonly type = CLEAR_PROFILE;
}

export class SetResponse implements Action {

    readonly type = SET_RESPONSE;

    constructor(public payload : number) { }
}

export type ProfileActions = GetProfile | LoadProfile | ClearProfile | SaveProfile | SetResponse;