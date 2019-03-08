import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-user-card',
	templateUrl: './user-card.component.html',
	styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

	@Input() user: User;
	private selected : boolean = false;
	
	constructor(private router: Router) {}

	ngOnInit() {

	}

	onClick() {
		this.selected = !this.selected
	}

	onViewProfile() {
		this.router.navigate([`/profile/${this.user.id}`]);
	}
	
	getFullName() {
		return `${this.user.first} ${this.user.last}`;
	}

}
