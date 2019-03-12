import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducers';
import * as MessengerActions from '../../messenger/store/messenger.actions';
import * as UserActions from '../store/users.actions';

@Component({
	selector: 'app-user-card',
	templateUrl: './user-card.component.html',
	styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

	@Input() user: User;
	
	constructor(private store: Store<fromApp.AppState>,private router: Router) {}

	ngOnInit() {

	}

	onClick() {

		this.store.dispatch(new MessengerActions.ClearMessages());
		this.store.dispatch(new MessengerActions.SetTarget(this.user));
	}

	
	getFullName() {
		return `${this.user.first} ${this.user.last}`;
	}

}
