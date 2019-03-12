import * as MessengerActions  from './messenger.actions';

export interface State {
    isGroup: boolean
    messages: any[]
    response: any
}

const initialState : State = {

    isGroup: false,
    messages: [],
    response: null
}

export interface TargetState {
    messageTarget: any
}

const initialTarget : TargetState = {
    messageTarget: null
}

export function messengerReducer(state = initialState, action: MessengerActions.MessengerActions) {

    switch (action.type) { 

        case MessengerActions.LOAD_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }
        case MessengerActions.CLEAR_MESSAGES:
            return {
                ...state,
                messages: []
            }
        case MessengerActions.SET_RESPONSE:
            return {
                ...state,
                response: action.payload
            }
        default:
            return state;
    }
}

export function targetReducer(state = initialTarget, action: MessengerActions.MessengerActions) {

    switch (action.type) { 

        case MessengerActions.SET_TARGET:
            return {
                messageTarget: action.payload
            }
        default:
            return state;
    }
}