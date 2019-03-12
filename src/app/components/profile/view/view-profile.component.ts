import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

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

	/* Subscription to keep track of store */
	private subscription: Subscription;

	/* Variable to store profile */
	private profile: any = null;

	/* Separate variables to determine if this page can be edited */
	private loggedUserID : number = -1;
	private profileID : number = -2;

	/* Edit boolean to toggle page state */
	private editMode : boolean = false;

	/* Edit profile form */
	private editForm: FormGroup

	constructor(private store: Store<fromApp.AppState>, private router : Router, private route : ActivatedRoute) {}


	ngOnInit() {
		

		this.profileID = this.route.snapshot.params['id'];
		this.store.dispatch(new ProfileActions.GetProfile(this.profileID));

		this.subscription = this.store.select('user').subscribe(
			(userState: fromAuth.State) => {
				if (userState.user) {
					this.loggedUserID = userState.user['id'];
				}
			}
		)

		this.subscription.add(this.store.select('profile').subscribe(
			(profileState: fromProfile.State) => {
				if (profileState.profile) {
					this.profile = profileState.profile;
				}
			}
		));
	
	}

	ngOnDestroy() {
		this.store.dispatch(new ProfileActions.ClearProfile());
		this.subscription.unsubscribe();
	}

	isViewingSelf() {
		return (this.loggedUserID == this.profileID);
	}

	onEditProfile(){
		this.editMode = !this.editMode;
		this.editForm = new FormGroup({
			about: new FormControl(this.profile['blurb']),
			occupation: new FormControl(this.profile['occupation']),
			location: new FormControl(this.profile['location']),
			birthday: new FormControl(this.profile['birthday']),
		})
	}

	getFullName() {

		if (this.profile.first !== null) {
			return `${this.profile.first} ${this.profile.last}`;
		}
		else {
			return '';
		}
	}

}
