import * as AuthActions from './auth.actions';
import { User } from '../../home/user-list/user.model';

export interface State {
    user: {},
    authenticated: boolean
}

const initialState: State = {
    user: null,
    authenticated: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {

    switch (action.type) {
        case AuthActions.SIGN_UP:
        case AuthActions.SIGN_IN:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                },
                authenticated: true
            }
        case AuthActions.TRY_SIGN_IN:
            return {
                ...state,
                user: {
                    ...action.payload
                }
            }
        case AuthActions.LOG_OUT:
            return {
                user: null,
                authenticated: null
            }
        default:
            return state;
    }
}