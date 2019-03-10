import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { FormGroup, FormControl } from '@angular/forms';

import * as fromApp from '../../store/app.reducers';
import * as fromList from '../user-list/store/users.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';

import * as UserActions from '../user-list/store/users.actions';
import * as fromMessenger from './store/messenger.reducers';
import * as MessengerActions from '../messenger/store/messenger.actions';
import { Router } from '@angular/router';




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

	/* Boolean to determine visual state */
	private userSet: boolean = false;


	private messageForm: FormGroup;


	constructor(private store: Store<fromApp.AppState>, private router: Router) { }

	ngOnInit() {
		
		this.messageForm = new FormGroup({
			message: new FormControl(null)
		});

		this.store.select('user').pipe(take(1)).subscribe(
			(userState: fromAuth.State) => {
				this.user = userState.user;
			}
		);

		/* Listen to event - user clicking on a different person to message */
		/* TODO: Fix possible bug where user list update can trigger this event */
		this.subscription = this.store.select('contactList').subscribe(
			(state: fromList.State) => {
				if (state.target) {
					this.userSet = true;
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

	sendMessage() {
	
		this.store.dispatch(new MessengerActions.SendMessage({
			sender: this.user.id,
			destination: this.target.id,
			isGroup: false,
			pw: this.user.password,
			message: this.messageForm.controls.message.value
		}));
	}

	viewProfile() {
		this.router.navigate([`/profile/${this.target.id}`]);
	}

	getName() {
		if (this.target !==null) {
			return this.target.first;
		}
	}
}