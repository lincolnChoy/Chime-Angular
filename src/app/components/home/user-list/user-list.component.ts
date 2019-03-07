import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../store/app.reducers';
import * as fromUsers from './store/users.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UserActions from './store/users.actions';
import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

	usersState : Observable<fromUsers.State>;

	constructor(private store: Store<fromApp.AppState>) {}

	ngOnInit() {
		
		/* Connect userlist to store */
		this.usersState = this.store.select('contactList');

		/* Get user credentials and call API to fetch user list */
		this.store.select('user').subscribe(
			(userState: fromAuth.State) => {
				this.store.dispatch(new UserActions.GetUsers({ id: userState.user['id'], password: userState.user['password'] }));
			}
		)
		
		
		
	}

}
