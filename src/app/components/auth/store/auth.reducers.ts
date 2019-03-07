import * as AuthActions from './auth.actions';

export interface State {
    user: {},
    authenticated: boolean,
    error: number
}

const initialState: State = {
    user: null,
    authenticated: false,
    error: -1
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
        case AuthActions.TRY_SIGN_UP:
        return {
            ...state,
            user: {
                ...action.payload
            }
        }
        case AuthActions.LOG_OUT:
            return {
                error: -1,
                user: null,
                authenticated: null
            }
        case AuthActions.SHOW_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case AuthActions.CLEAR_ERROR:
            return {
                ...state,
                error: -1
            }
        default:
            return state;
    }
}