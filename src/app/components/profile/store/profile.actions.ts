import { Action } from '@ngrx/store';

export const GET_PROFILE = 'GET_PROFILE';

class GetProfile implements Action{

    readonly type = GET_PROFILE;

    constructor(public payload : { id: number, password: string}) {}
}


export type ProfileActions = GetProfile;