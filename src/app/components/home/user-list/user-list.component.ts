import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from '../../store/app.reducers';
import * as fromUsers from './store/users.reducers';
import { Store } from '@ngrx/store';
import { Observable, Subscription, interval } from 'rxjs';
import * as UserActions from './store/users.actions';
import * as fromAuth from '../../auth/store/auth.reducers';
import { UPDATE_INTERVAL } from 'src/constants';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css']
})



export class UserListComponent implements OnInit, OnDestroy {

	private user;

	private usersState : Observable<fromUsers.State>;

	/* Used to fetch user list and listen to store changes */
	private subscription: Subscription;


	constructor(private store: Store<fromApp.AppState>) {}

	ngOnInit() {
		
		/* Connect userlist to store */
		this.usersState = this.store.select('contactList');

		/* Get user credentials and call API to fetch user list */
		this.subscription = this.store.select('user').subscribe(
			(userState: fromAuth.State) => {
				
				/* Check if user isn't null to prevent error upon logging out */
				if (userState.user) {
					this.user = userState.user;
					this.store.dispatch(new UserActions.GetUsers({ id: userState.user['id'], password: userState.user['password'] }));
				}
			}
		);

		/* Fetch user list every minute and report back to server */
		this.subscription.add(interval(UPDATE_INTERVAL).subscribe(
			(x) => {
				this.store.dispatch(new UserActions.GetUsers({ id: this.user['id'], password: this.user['password'] }));
			}
		));
	}

	ngOnDestroy() {

		this.subscription.unsubscribe();
	}

}
