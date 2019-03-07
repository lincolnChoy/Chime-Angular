import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs/operators';


@Injectable()

export class AuthGuard implements CanActivate {

	constructor(private store: Store<fromApp.AppState>, private router : Router) {}
	
	canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) {

		return this.store.select('user')
			.pipe(take(1),
				map((authState: fromAuth.State) => {
					if (!authState.authenticated) {
						this.router.navigate(['/']);
					}
					return authState.authenticated;
				}));
	
	}
}