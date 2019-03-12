import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

	private id: number;
	private subscription: Subscription;

	constructor(private store: Store<fromApp.AppState>,private router: Router, private route: ActivatedRoute) {}

		ngOnInit() {
		this.subscription = this.store.select('user').subscribe(
			(userState: fromAuth.State) => {
				if (userState.user) {
					this.id = userState.user['id'];
				}
			}
		)
	}

	onLogout() {
		this.store.dispatch(new AuthActions.LogOut());
		this.router.navigate(['/']);
	}
	
	visitProfile() {
		this.router.navigate([`/profile/${this.id}`]);
	}

}
