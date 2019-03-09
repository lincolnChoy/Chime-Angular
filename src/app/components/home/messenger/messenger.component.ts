import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducers';
import * as fromList from '../user-list/store/users.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as fromMessenger from './store/messenger.reducers';
import * as MessengerActions from '../messenger/store/messenger.actions';




@Component({
    selector: 'app-messenger',
	templateUrl: './messenger.component.html',
	styleUrls: ['./messenger.component.css']
})

export class MessengerComponent implements OnInit {

	
	private subscription: Subscription;

	/* Stores information about the target to be messaged */
	private target: any = null;

	/* Stores information about the current user */
	private user: any = null;

	/* Message array to store messages when fetched */
	private messages = []


	constructor(private store: Store<fromApp.AppState>) { }

	ngOnInit() {
		
		/* Listen to event - user clicking on a different person to message */
		/* TODO: Fix possible bug where user list update can trigger this event */
		this.subscription = this.store.select('contactList').subscribe(
			(state: fromList.State) => {
				if (state.target) {

					this.target = state.target;
					this.store.select('user').pipe(take(1)).subscribe(
						(userState: fromAuth.State) => {
							this.user = userState.user;
							this.store.dispatch(new MessengerActions.GetMessages(
								{ 
									sender: this.user.id,
									destination: this.target.id,
									isGroup: false,
									pw: this.user.password
								}));
						}
					)
				}
			}
		);

		this.subscription.add(this.store.select('messenger').subscribe(
			(messagesState: fromMessenger.State) => {
				this.messages = messagesState.messages;
			}
		));
		
	}

	// TODO: Will not work with group messages
	isSending(messageObject: any) {

		return messageObject.sender === this.user.id;

	}

	getName() {
		if (this.target !==null) {
			return this.target.first;
		}
	}
}