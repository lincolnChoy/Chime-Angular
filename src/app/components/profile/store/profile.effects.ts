import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap, mergeMap } from 'rxjs/operators';;
import { HttpClient } from '@angular/common/http';
import { ADDRESS } from '../../../../constants';
import { Router } from '@angular/router';

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
					return [
						{
							type: ProfileActions.LOAD_PROFILE,
							payload: user
						}
					];
				}
			}));
	

	constructor(private actions$: Actions, private router: Router,private httpClient: HttpClient) {}
}
