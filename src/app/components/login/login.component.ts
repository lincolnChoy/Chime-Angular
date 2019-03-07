import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as fromApp from '../store/app.reducers';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	private loginForm: FormGroup;

	/* Booleans for determining the visual state of the login form */
	private error: boolean = false;
	private errorMessage: string = '';
	private showSpinner: boolean = false;

	constructor(private store: Store<fromApp.AppState>, private router: Router, ) {

	}

	ngOnInit() {
		this.loginForm = new FormGroup({

			'email' : new FormControl(null, [Validators.required, Validators.email]),
			'password' : new FormControl(null)
		});
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
			// .subscribe(
			// 	(resp) => {
			// 		this.showSpinner = false;
			// 		if (parseInt(resp['code']) !== 0) {
	
			// 			this.error = true;
			// 			if (parseInt(resp['code']) === 1) {
	
			// 				this.errorMessage = 'Incorrect/password email.';
			// 			}
			// 		}
			// 		else {
			// 			this.authService.authorise();
			// 			this.router.navigate(['/home'])
			// 		}
			// 		console.log(resp);
			// 	}
			// );
		}

	}

}
