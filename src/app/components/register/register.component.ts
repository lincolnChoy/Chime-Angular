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
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['../login/login.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

	private registrationForm: FormGroup;

	/* Variable for determining the visual state of the login form */
    private error: boolean = false;
	private errorMessage: string = '';
    private showSpinner: boolean = false;

    private subscription: Subscription;

	constructor(private store: Store<fromApp.AppState>, private router: Router) {}

	ngOnInit() {
		this.registrationForm = new FormGroup({

            'first' : new FormControl(null, [Validators.required]),
            'last' : new FormControl(null, [Validators.required]),
			'email' : new FormControl(null, [Validators.required, Validators.email]),
            'password' : new FormControl(null),
            'confPassword' : new FormControl(null),
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

	onSubmit() {

        const first = this.registrationForm.controls.first.value;
        const last = this.registrationForm.controls.last.value;
		const email = this.registrationForm.controls.email.value;
        const password = this.registrationForm.controls.password.value;
        const confPassword = this.registrationForm.controls.confPassword.value;

		/* Missing fields */
		if (!email || !password || !confPassword || !first || !last) {
			this.error = true;
			this.errorMessage = 'Please fill out all fields.';
		} 
		/* Form is fine */
		else {
			this.error = false;
			this.showSpinner = true;
			this.store.dispatch(new AuthActions.TrySignUp({ first: first, last: last, email: email, password: password }));
		}

	}

}
