import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { UserListComponent } from './user-list/user-list.component';
import { HomeComponent } from './home.component';
import { UserCardComponent } from './user-list/user-card/user-card.component';

@NgModule({
	declarations: [
		HomeComponent,
		NavbarComponent,
		UserListComponent,
		UserCardComponent
	],
	imports: [
		CommonModule
	]
})
export class HomeModule {}
