import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as fromProfile from '../store/profile.reducers';
import * as ProfileActions from '../store/profile.actions';
import { take } from 'rxjs/operators';

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
	private picture: string = null;

	/* Shows loading spinner */
	private waiting: boolean;

	private updateResponse: number = -1;

	constructor(private store: Store<fromApp.AppState>, private router : Router, private route : ActivatedRoute) {
		this.uploadFile = this.uploadFile.bind(this);
	}


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

		/* Listens to these events 
		- profile loaded
		- profile update response
		*/
		this.subscription.add(this.store.select('profile').subscribe(
			(profileState: fromProfile.State) => {
				if (profileState.profile) {
					this.profile = profileState.profile;
				}
				if (profileState.response === 0 || profileState.response !== null) {
					this.waiting = false;
					this.updateResponse = profileState.response;
					
				}
			}
		));

		/* Listens to route changes and updates profile accordingly */
		this.subscription.add(this.route.params.subscribe(params => {
			this.profileID = this.route.snapshot.params['id'];
			this.store.dispatch(new ProfileActions.GetProfile(this.profileID));
		}));
	
	}

	ngOnDestroy() {

		this.store.dispatch(new ProfileActions.ClearProfile());
		this.subscription.unsubscribe();
	}

	isViewingSelf() {

		return (this.loggedUserID == this.profileID);
	}

	onEditProfile() {

		this.editMode = !this.editMode;
		this.editForm = new FormGroup({
			about: new FormControl(this.profile['blurb']),
			occupation: new FormControl(this.profile['occupation']),
			location: new FormControl(this.profile['location']),
			birthday: new FormControl(this.profile['birthday']),
		})
	}

	
	uploadFile(event) {
		let file = event.target.files[0];

		var reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = () => {

			var fileData = reader.result.toString();
			this.picture = fileData;
		}
}

	onUpdateProfile() {

		/* Grab user credentials from store and call API to update profile */
		this.store.select('user').pipe(take(1)).subscribe(
			(userState: fromAuth.State) => {
				if (userState.user) {

					/* Display loading spinner */
					this.waiting = true;

					const blurb = this.editForm.controls.about.value;
					const occupation = this.editForm.controls.occupation.value;
					const location = this.editForm.controls.location.value;
					const birthday = this.editForm.controls.birthday.value;
					const picture = this.picture;

					this.store.dispatch(new ProfileActions.SaveProfile({
						id: userState.user['id'],
						pw: userState.user['password'],
						blurb: blurb,
						occupation: occupation,
						location: location,
						birthday: birthday,
						picture: picture
					}));
				}
			}
		);
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
