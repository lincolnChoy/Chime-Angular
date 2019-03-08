import { Action } from '@ngrx/store';

export const GET_PROFILE = 'GET_PROFILE';
export const LOAD_PROFILE = 'LOAD_PROFILE';

export class GetProfile implements Action{

    readonly type = GET_PROFILE;

    constructor(public payload : number) {}
}


export class LoadProfile implements Action{

    readonly type = LOAD_PROFILE;

    constructor(public payload : any) {}
}


export type ProfileActions = GetProfile | LoadProfile;