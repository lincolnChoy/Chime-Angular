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

import { HomeModule } from './components/home/home.module';
import { MaterialThemeModule } from './materialtheme.module';
import { RegistrationComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileEffects } from './components/profile/store/profile.effects';
import { ViewProfileComponent } from './components/profile/view/view-profile.component';
import { EditProfileComponent } from './components/profile/edit/edit-profile.component';


@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegistrationComponent,
		ProfileComponent,
		ViewProfileComponent,
		EditProfileComponent,
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
		HomeModule,
		StoreModule.forRoot(reducers),
		EffectsModule.forRoot([ UserEffects, ProfileEffects, AuthEffects ]),
	],
	providers: [ AuthGuard ],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
