import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user.model';

@Component({
	selector: 'app-user-card',
	templateUrl: './user-card.component.html',
	styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

	@Input() user: User;
	
	constructor() {}

	ngOnInit() {

	}
	
	getFullName() {
		return `${this.user.first} ${this.user.last}`;
	}

}
