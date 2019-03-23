import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { FormGroup, FormControl } from '@angular/forms';

import * as fromApp from '../../store/app.reducers';
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

	private showZoom: boolean = false;
	private zoomImage: string;


	constructor(private store: Store<fromApp.AppState>, private router: Router) { 
		this.uploadFile = this.uploadFile.bind(this);
	}

	ngOnInit() {
		
		this.messageForm = new FormGroup({
			message: new FormControl(null)
		});

		/* Get user once */
		this.store.select('user').pipe(take(1)).subscribe(
			(userState: fromAuth.State) => {
				this.user = userState.user;
			}
		);

		/* Listen to event - user clicking on a different person to message */
		this.subscription = this.store.select('target').subscribe(
			(state: fromMessenger.TargetState) => {

				/* Make sure target isn't empty */
				if (state.messageTarget) {

					/* Display message container */
					this.userSet = true;
					
					/* Set target */
					this.target = state.messageTarget;

					/* Fetch messages */
					this.store.dispatch(new MessengerActions.GetMessages({ 
						sender: this.user.id,
						destination: this.target.id,
						isGroup: false,
						pw: this.user.password
					}));
				}
					
			}
			
		);

		this.subscription.add(this.store.select('messenger').subscribe(
			(messagesState: fromMessenger.State) => {
				this.messages = messagesState.messages;
				/* Not sure why the 0s timeout is necessary but it works */ 
				setTimeout(() => {
					this.scrollToBottom();
				},0);
				
			}
		));
		
	}

	uploadFile(event) {

		/* Grab the file and read as a base64 string */
		let file = event.target.files[0];
		var reader = new FileReader();
		reader.readAsDataURL(file);


		/* When b64 string is ready, send it to the back-end */
		reader.onload = () => {

			var fileData = reader.result.toString();
			this.store.dispatch(new MessengerActions.SendMessage({
				sender: this.user.id,
				destination: this.target.id,
				pw: this.user.password,
				message: fileData,
				isFile: true,
				// Hardcoded for now
				isGroup: false,
			}));
		}
	}

	checkConsecutiveMessage(index, messages) {

		if (index === 0) {
			return false;
		}
		else {
			return (messages[index].sender === messages[index - 1].sender);
		}
	}

	getPicture(i, messages) {

		if (!this.checkConsecutiveMessage(i, messages)) {
			return (messages[i].sender === this.target.id ? this.target.picture : this.user.picture);
		}
		else {
			return 'assets/transparent.png';
		}
	}


	/* Key listener for message input field */
	onPress(event) {
		if (event.key === 'Enter') {
			this.sendMessage();
		}
	}

	onZoomImage(image) {
		this.zoomImage = image;
		this.showZoom = true;
	}


	sendMessage() {
		
		const message = this.messageForm.controls.message.value;

		/* Check message isn't empty */
		if (message) {
			this.store.dispatch(new MessengerActions.SendMessage({
				sender: this.user.id,
				destination: this.target.id,
				pw: this.user.password,
				message: message,
				isFile: false,
				// Hardcoded for now
				isGroup: false,
			}));
			
			/* Clear input field after sending */
			this.messageForm.patchValue({
				message: null
			});
		}
	}


	/* Scrolls to bottom of message list */
	scrollToBottom() {
		if (this.target !== null) {
			var elem = document.getElementById('bottom');
			if (elem) {
				elem.scrollTop = elem.scrollHeight;
			}
		}
	}


	/* Shows name of message target on top of message box */
	getName() {
		if (this.target !==null) {
			return this.target.first;
		}
	}


	/* Views profile after clicking name tag of message target */
	onViewProfile() {
		this.router.navigate([`/profile/${this.target.id}`]);
	}


	/* Helper function to determine placement of message card */
	// TODO: Will not work with group messages
	isSending(messageObject: any) {

		return messageObject.sender === this.user.id;

	}

}