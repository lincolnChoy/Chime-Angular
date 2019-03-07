import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


	constructor(private store: Store<fromApp.AppState>,private router: Router) {}

    
    onLogout() {
		this.store.dispatch(new AuthActions.LogOut());
		this.router.navigate(['/']);
    }

}
