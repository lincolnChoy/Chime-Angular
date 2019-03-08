import * as ProfileActions from './profile.actions';

export interface State {
    profile: {
        id: number,
        first: string,
        last: string,
        occupation: string,
        blurb: string,
        picture: string
    }
}

const initialState: State = {
    profile: {
        id: null,
        first: null,
        last: null,
        occupation: null,
        blurb: null,
        picture: null
    }
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
        case ProfileActions.CLEAR_PROFILE:
            return initialState;
        default:
            return state;
    }

}

