import { ActionReducerMap } from '@ngrx/store';
import * as fromUsers from '../home/user-list/store/users.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import * as fromProfile from '../profile/store/profile.reducers';

export interface AppState {
    user: fromAuth.State,
    contactList: fromUsers.State,
    profile: fromProfile.State
}

export const reducers: ActionReducerMap<AppState> = {
    user: fromAuth.authReducer,
    contactList: fromUsers.usersReducer,
    profile: fromProfile.profileReducer
}

