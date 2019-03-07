import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from '../store/app.reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromAuth from '../auth/store/auth.reducers';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

	private subscription: Subscription;

	constructor(private store: Store<fromApp.AppState>, private router : Router, private route : ActivatedRoute) {}

	ngOnInit() {
		

		/* Get user credentials and call API to fetch user-profile */
		this.subscription = this.store.select('user').subscribe(
			(userState: fromAuth.State) => {
				/* Check if user isn't null to prevent error upon logging out */
				if (userState.user) {
					// this.store.dispatch(new ProfileActions.GetProfile({ id: userState.user['id'], password: userState.user['password'] }));
				}
			}
		)
		console.log(this.route.snapshot.params['id'], 'params');
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

}
