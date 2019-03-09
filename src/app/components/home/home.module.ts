import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { UserListComponent } from './user-list/user-list.component';
import { HomeComponent } from './home.component';
import { UserCardComponent } from './user-list/user-card/user-card.component';
import { MessengerComponent } from './messenger/messenger.component';

@NgModule({
	declarations: [
		HomeComponent,
		NavbarComponent,
		UserListComponent,
		UserCardComponent,
		MessengerComponent
	],
	imports: [
		CommonModule
	]
})
export class HomeModule {}
