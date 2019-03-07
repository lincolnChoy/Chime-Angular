import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './components/auth/auth.service';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './components/auth/auth-guard.service';
import { NavbarComponent } from './components/home/navbar/navbar.component';

import { CustomSpinnerComponent } from './components/shared/customSpinner/customSpinner.component';

import { MaterialThemeModule } from './materialtheme.module';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		HomeComponent,
		NavbarComponent,
		CustomSpinnerComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		MaterialThemeModule,
		BrowserAnimationsModule
	],
	providers: [ AuthService, AuthGuard ],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
