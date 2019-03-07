import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import * as AuthActions from '../auth/store/auth.actions';

import { errorHandler } from '../shared/errorHandler/errorHandler';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

	private loginForm: FormGroup;

	/* Booleans for determining the visual state of the login form */
	private error: boolean = false;
	private errorMessage: string = '';
	private showSpinner: boolean = false;

	private subscription: Subscription;

	constructor(private store: Store<fromApp.AppState>, private router: Router) {}

	ngOnInit() {

		this.loginForm = new FormGroup({

			'email' : new FormControl(null, [Validators.required, Validators.email]),
			'password' : new FormControl(null)
		});

		this.subscription = this.store.select('user').subscribe(
            (userState: fromAuth.State) => {
                if (userState.error !== -1) {
                    this.showSpinner = false;
                    this.error = true;
                    this.errorMessage = errorHandler(userState.error);
                }
            }
        );
	}

	ngOnDestroy() {
		this.store.dispatch(new AuthActions.ClearError());
		this.subscription.unsubscribe();
	}

	onLogin() {

		const email = this.loginForm.controls.email.value;
		const password = this.loginForm.controls.password.value;

		/* Missing fields */
		if (!email || !password) {
			this.error = true;
			this.errorMessage = 'Please fill out both fields.';
		} 
		/* Form is fine */
		else {
			this.error = false;
			this.showSpinner = true;
			this.store.dispatch(new AuthActions.TrySignIn({ email: email, password: password }));

		}

	}

}
