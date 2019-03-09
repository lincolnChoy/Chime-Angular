import * as UserActions from './users.actions';

export interface State {
    userList: any[],
    groupList: any[],
    target: any
}

const initialState: State = {
    userList: [],
    groupList: [],
    target: null
};

export function usersReducer(state = initialState, action: UserActions.UserActions) {

    switch (action.type) {
        case UserActions.GET_USERS:
            return {
                ...state
            }
        case UserActions.SET_USERS:
            return {
                ...state,
                userList: action.payload.users,
                groupList: action.payload.groups
            }
        case UserActions.SET_TARGET:
            return {
                ...state,
                target: action.payload
            }
        default:
            return state;
    }
}