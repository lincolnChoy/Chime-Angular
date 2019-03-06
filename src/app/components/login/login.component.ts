import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	private loginForm: FormGroup;
	private error: boolean = false;
	private errorMessage: string = '';

	constructor(private authService: AuthService, private router: Router) {

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
			this.authService.login(email, password).subscribe(
				(resp) => {
					if (parseInt(resp['code']) !== 0) {
	
						this.error = true;
						if (parseInt(resp['code']) === 1) {
	
							this.errorMessage = 'Incorrect/password email.';
						}
					}
					else {
						this.authService.authorise();
						this.router.navigate(['/home'])
					}
					console.log(resp);
				}
			);
		}

	}

}
