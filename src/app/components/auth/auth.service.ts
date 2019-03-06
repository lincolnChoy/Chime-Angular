import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ADDRESS } from '../../../constants';

import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

	private authorised : boolean = true;
	private email : string = '';
	private password : string = '';

	constructor(private httpClient : HttpClient, private router : Router) {}

	isAuthenticated() {
		return this.authorised;
	}

	authorise() {
		this.authorised = true;
	}


	login(email : string, password : string) {
		
		this.email = email;
		this.password = password;
		
		return this.httpClient.post(`${ADDRESS}/signIn`, { email : email, pw : password});
	}

	logout() {
		this.authorised = false;
		this.router.navigate(['/']);
	}

	getCreds() {
		return {
			email : this.email,
			password : this.password
		}
	}

	createAccount(username : string, first : string, last : string, email : string, password : string) {
		
		return this.httpClient.post(`${ADDRESS}/register`,
			{
				first : first,
				last : last,
				email : email,
				pw : password
			});
	}

}