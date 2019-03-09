import * as MessengerActions  from './messenger.actions';

export interface State {
    messageTarget: any,
    isGroup: boolean
    messages: any[]
}

const initialState : State = {

    messageTarget: null,
    isGroup: false,
    messages: []
}

export function messengerReducer(state = initialState, action: MessengerActions.MessengerActions) {

    switch (action.type) { 

        case MessengerActions.SEND_MESSAGE:
            return state;
        case MessengerActions.SET_TARGET:
            return {
                ...state,
                messageTarget: action.payload
            }
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
        default:
            return state;
    }
}