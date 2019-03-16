import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap, mergeMap } from 'rxjs/operators';;
import { HttpClient } from '@angular/common/http';
import { ADDRESS } from '../../../../constants';

import * as ProfileActions from './profile.actions';

@Injectable()
export class ProfileEffects {

	@Effect()
	getProfile = this.actions$
		.ofType(ProfileActions.GET_PROFILE)
		.pipe(map((action: ProfileActions.GetProfile) => {
				return action.payload;
			})
			,switchMap((targetID: number) => {
				return this.httpClient.get(`${ADDRESS}/getProfile?user=${targetID}`);
			})
			,mergeMap((response) => {
				if (response['code'] === 0) {
                    const user = {
                        ...response
					}
					console.log('here');
					return [
						{
							type: ProfileActions.LOAD_PROFILE,
							payload: user
						}
					];
				}
			}));

	@Effect()
	saveProfile = this.actions$
		.ofType(ProfileActions.SAVE_PROFILE)
		.pipe(map((action: ProfileActions.SaveProfile) => {
				return action.payload;
			})
			,switchMap((data: { id: string, pw: string, picture: string, birthday: string, location: string, occupation: string, blurb: string}) => {
				return this.httpClient.post(`${ADDRESS}/saveProfile`, {...data });
			})
			,mergeMap((response) => {
				if (response['code'] === 0) {
					return [
						{
							type: ProfileActions.SET_RESPONSE,
							payload: response['code']
						}
					];
				}
			}));


	constructor(private actions$: Actions, private httpClient: HttpClient) {}
}
