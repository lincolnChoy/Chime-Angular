import { Action } from '@ngrx/store';
import { User } from '../../home/user-list/user.model';

export const TRY_SIGN_IN = 'TRY_SIGN_IN';
export const TRY_SIGN_UP = 'TRY_SIGN_UP';

export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const LOG_OUT = 'LOG_OUT';

export class TrySignIn implements Action {

    readonly type = TRY_SIGN_IN;

    constructor(public payload: { email: string, password: string}) { }

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

export type AuthActions = SignIn | SignUp | LogOut | TrySignIn;
