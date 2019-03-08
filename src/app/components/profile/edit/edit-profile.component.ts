import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormGroup } from '@angular/forms';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as fromProfile from '../store/profile.reducers';
import * as ProfileActions from '../store/profile.actions';


@Component({
	selector: 'app-edit-profile',
	templateUrl: './edit-profile.component.html',
	styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {

	profileState: Observable<fromProfile.State>;
	private subscription: Subscription;

	constructor(private store: Store<fromApp.AppState>, private router : Router, private route : ActivatedRoute) {}

	
	ngOnInit() {
		

		/* Get user credentials and call API to fetch user-profile */
		this.subscription = this.store.select('user').subscribe(
			(userState: fromAuth.State) => {
				/* Check if user isn't null to prevent error upon logging out */
				if (userState.user) {
					this.store.dispatch(new ProfileActions.GetProfile(userState.user['id']));
					this.profileState = this.store.select('profile');
				}
			}
		)

	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

}
