import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {map, switchMap, mergeMap} from 'rxjs/operators';;
import * as UserActions from './users.actions';
import { HttpClient } from '@angular/common/http';
import { ADDRESS } from '../../../../../constants';

@Injectable()
export class UserEffects {

	@Effect()
	getUserList = this.actions$
		.ofType(UserActions.GET_USERS)
		.pipe(map((action: UserActions.GetUsers) => {
				return action.payload;
			})
			, switchMap((authData: { id: number, password: string }) => {
				return this.httpClient.post(`${ADDRESS}/getList`, { id: authData.id, pw: authData.password });
			})
			, mergeMap((response) => {
				return [
					{
						type: UserActions.SET_USERS,
						payload: {
							groups: response['group'],
							users: response['users']
						}
					}
				];
			}));


	constructor(private actions$: Actions, private httpClient: HttpClient) {}
}
