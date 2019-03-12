import { Component, Input } from '@angular/core';
import { User } from '../user.model';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducers';
import * as MessengerActions from '../../messenger/store/messenger.actions';

@Component({
	selector: 'app-user-card',
	templateUrl: './user-card.component.html',
	styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {

	@Input() user: User;
	
	constructor(private store: Store<fromApp.AppState>) {}

	onClick() {

		this.store.dispatch(new MessengerActions.ClearMessages());
		this.store.dispatch(new MessengerActions.SetTarget(this.user));
	}

	getOnlineStatus() {

		const timeNow = (new Date()).getTime();
		if (timeNow - (+this.user.lastSeen) <= 120000) {
			return 'assets/dot.png';
		}
		else {
			return '';
		}	

	}
	
	getFullName() {
		return `${this.user.first} ${this.user.last}`;
	}

}
