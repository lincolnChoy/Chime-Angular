import { Action } from '@ngrx/store';
import { User } from '../../home/user-list/user.model';

export const TRY_SIGN_IN = 'TRY_SIGN_IN';
export const TRY_SIGN_UP = 'TRY_SIGN_UP';

export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const LOG_OUT = 'LOG_OUT';

export const SHOW_ERROR = 'SHOW_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export class TrySignIn implements Action {

    readonly type = TRY_SIGN_IN;

    constructor(public payload: { email: string, password: string}) { }

}

export class TrySignUp implements Action {

    readonly type = TRY_SIGN_UP;

    constructor(public payload: { first: string, last: string, email: string, password: string}) { }

}


export class SignIn implements Action {

    readonly type = SIGN_IN;
    
    constructor(public payload: any) {}
}

export class SignUp implements Action {
    
    readonly type = SIGN_UP;

    constructor(public payload: any) {}
}

export class LogOut implements Action {

    readonly type = LOG_OUT;
}

export class ShowError implements Action {
    readonly type = SHOW_ERROR;

    constructor(public payload: number) { }
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export type AuthActions = SignIn | SignUp | LogOut | TrySignIn | TrySignUp | ShowError | ClearError;
