import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/auth/auth-guard.service';
import { reducers } from './components/store/app.reducers';
import { UserEffects } from './components/home/user-list/store/users.effects';
import { AuthEffects } from './components/auth/store/auth.effects';

import { CustomSpinnerComponent } from './components/shared/customSpinner/customSpinner.component';

import { MaterialThemeModule } from './materialtheme.module';
import { RegistrationComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileEffects } from './components/profile/store/profile.effects';
import { ViewProfileComponent } from './components/profile/view/view-profile.component';
import { MessengerEffects } from './components/home/messenger/store/messenger.effects';
import { NavbarComponent } from './components/home/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/home/user-list/user-list.component';
import { UserCardComponent } from './components/home/user-list/user-card/user-card.component';
import { MessengerComponent } from './components/home/messenger/messenger.component';


@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegistrationComponent,

		NavbarComponent,
		HomeComponent,

		ProfileComponent,
		ViewProfileComponent,

		UserListComponent,
		UserCardComponent,
		MessengerComponent,
		
		CustomSpinnerComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		MaterialThemeModule,
		BrowserAnimationsModule,
		StoreModule.forRoot(reducers),
		EffectsModule.forRoot([ UserEffects, ProfileEffects, AuthEffects, MessengerEffects ]),
	],
	providers: [ AuthGuard ],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
