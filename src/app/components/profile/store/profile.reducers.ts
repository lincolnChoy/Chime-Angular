import * as ProfileActions from './profile.actions';

export interface State {
    profile: any
}

const initialState: State = {
    profile: null
}

export function profileReducer(state = initialState, action: ProfileActions.ProfileActions) {

    switch (action.type) {
        case ProfileActions.GET_PROFILE:
            return {
                ...state
            }
        case ProfileActions.LOAD_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        default:
            return state;
    }

}

