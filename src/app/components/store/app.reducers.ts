import { ActionReducerMap } from '@ngrx/store';
import * as AppActions from './app.actions';
import * as fromUsers from '../home/user-list/store/users.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import * as fromProfile from '../profile/store/profile.reducers';
import * as fromMessenger from '../home/messenger/store/messenger.reducers';

export interface AppState {
    user: fromAuth.State,
    contactList: fromUsers.State,
    profile: fromProfile.State,
    messenger: fromMessenger.State,
    target: fromMessenger.TargetState,
}

export const reducers: ActionReducerMap<AppState> = {
    user: fromAuth.authReducer,
    contactList: fromUsers.usersReducer,
    profile: fromProfile.profileReducer,
    messenger: fromMessenger.messengerReducer,
    target: fromMessenger.targetReducer
}

export function clearState(reducer) {

    return function (state, action) {
  
        if (action.type === AppActions.LOGOUT) {
            state = undefined;
        }
    
        return reducer(state, action);
    };
}