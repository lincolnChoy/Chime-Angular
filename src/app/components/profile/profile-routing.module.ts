import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { ViewProfileComponent } from './view/view-profile.component';
import { EditProfileComponent } from './edit/edit-profile.component';


const profileRoutes: Routes = [
	{ path: '', component: ProfileComponent, canActivate: [ AuthGuard], children: [
		{ path: ':id', component: ViewProfileComponent },
		{ path: 'edit', component: EditProfileComponent }
	] }
];

@NgModule({
	imports: [
		RouterModule.forChild(profileRoutes)
	],
	exports: [RouterModule],
	providers: [
		AuthGuard
	]
})
export class ProfileRoutingModule {}
