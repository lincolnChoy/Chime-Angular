import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as fromProfile from '../store/profile.reducers';
import * as ProfileActions from '../store/profile.actions';


@Component({
	selector: 'app-view-profile',
	templateUrl: './view-profile.component.html',
	styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit, OnDestroy {

	private subscription: Subscription;

	private profile: any = null;

	constructor(private store: Store<fromApp.AppState>, private router : Router, private route : ActivatedRoute) {}


	ngOnInit() {
		

		/* Get user credentials and call API to fetch user-profile */
		this.subscription = this.store.select('user').subscribe(
			(userState: fromAuth.State) => {
				/* Check if user isn't null to prevent error upon logging out */
				if (userState.user) {
					this.store.dispatch(new ProfileActions.GetProfile(userState.user['id']));
					
				}
			}
		)
		
		this.subscription.add(this.store.select('profile').subscribe(
			(profileState: fromProfile.State) => {
				
				this.profile = profileState.profile;
				console.log(profileState.profile);
			}
		));
	
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	getFullName() {
		
		if (this.profile) {
			return `${this.profile.first} ${this.profile.last}`;
		}
		else {
			return null;
		}
	}

}
