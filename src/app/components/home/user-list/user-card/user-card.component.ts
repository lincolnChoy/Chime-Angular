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

	wasRecentlyOnline() {
		const timeNow = (new Date()).getTime();
		return (timeNow - (+this.user.lastSeen) <= 30*1000);
	}

	getLastOnline() {
		const timeNow = (new Date()).getTime();

		let lastOn = Math.floor((timeNow - (+this.user.lastSeen))/(60*1000));

		/* More than 3 days ago */
		if (lastOn >= 4320) {
			return '>3d';
		}
		/* More than 1 day ago */
		else if (lastOn >= 1440) {
			return `${Math.floor(lastOn/(60*24))}d`;
		}
		/* More than one hour */
		else if (lastOn >= 60) {
			return `${Math.floor(lastOn/60)}h`;
		}
		else {
			return `${lastOn}m`;
		}
		
	}
	
	getFullName() {
		return `${this.user.first} ${this.user.last}`;
	}

}
