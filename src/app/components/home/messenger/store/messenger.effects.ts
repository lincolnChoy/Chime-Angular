import { Injectable } from "@angular/core";
import { Effect, Actions } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';

import { ADDRESS } from '../../../../../constants';
import * as MessengerActions from './messenger.actions';
import { map, switchMap, mergeMap } from 'rxjs/operators';

@Injectable()
export class MessengerEffects {

    @Effect()
    getMessages = this.actions$
                .ofType(MessengerActions.GET_MESSAGES)
                .pipe(map((action: MessengerActions.GetMessages) => {
                        return action.payload;
                    })
                    ,switchMap((authData: { sender: number, destination: number, pw: string, isGroup: boolean }) => {
                        return this.httpClient.post(`${ADDRESS}/getMessages`, { ...authData });
                    })
                    ,mergeMap((response) => {
                        if (response['code'] === 0) {
                            console.log(response);
                            return [
                                {
                                    type: MessengerActions.LOAD_MESSAGES,
                                    payload: response['messages']
                                }
                            ];
                        }

                        // else {
                        //     return [
                        //         {
                        //             type: AuthActions.SHOW_ERROR,
                        //             payload: response['code']
                        //         }
                        //     ];
                        // }
                    }));

    constructor(private actions$: Actions,private httpClient: HttpClient) {}
}