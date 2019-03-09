import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/auth/auth-guard.service';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ViewProfileComponent } from './components/profile/view/view-profile.component';

const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'register', component: RegistrationComponent },
	{ path: 'home', component: HomeComponent, canActivate: [ AuthGuard ]},
	{ path: 'profile', component: ProfileComponent, canActivate: [ AuthGuard ], children: [
		{ path: ':id', component: ViewProfileComponent}
	]},
	{ path: '**', redirectTo: ''}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
