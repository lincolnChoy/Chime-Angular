import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap, mergeMap } from 'rxjs/operators';;
import { HttpClient } from '@angular/common/http';
import { ADDRESS } from '../../../../constants';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

	@Effect()
	authSignIn = this.actions$
		.ofType(AuthActions.TRY_SIGN_IN)
		.pipe(map((action: AuthActions.TrySignIn) => {
				return action.payload;
			})
			,switchMap((authData: { email: string, password: string }) => {
				return this.httpClient.post(`${ADDRESS}/signIn`, { email: authData.email, pw: authData.password});
			})
			,mergeMap((response) => {
				if (response['code'] === 0) {
					this.router.navigate(['/home']);
					return [
						{
							type: AuthActions.SIGN_IN,
							payload: response['user']
						}
					];
				}

				else {
					return [
						{
							type: AuthActions.SHOW_ERROR,
							payload: response['code']
						}
					];
				}
			}));
	
	/* Registration effect */
	@Effect()
	authSignUp = this.actions$
		.ofType(AuthActions.TRY_SIGN_UP)
		.pipe(map((action: AuthActions.TrySignUp) => {
				return action.payload;
			})
			,switchMap((authData: { first: string, last: string, email: string, password: string }) => {
				return this.httpClient.post(`${ADDRESS}/register`, { first: authData.first, last: authData.last, email: authData.email, pw: authData.password });
			})
			,mergeMap((response) => {
				
				if (response['code'] === 0) {
					this.router.navigate(['/home']);
					return [
						{
							type: AuthActions.SIGN_UP,
							payload: response['user']
						}
					];
				}
				else {
					return [
						{
							type: AuthActions.SHOW_ERROR,
							payload: response['code']
						}
					];
				}

			}));


	constructor(private actions$: Actions, private router: Router,private httpClient: HttpClient) {}
}
