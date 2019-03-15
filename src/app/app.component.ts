import { Component } from '@angular/core';
import { particlesOptions } from './particlesjs-config';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: []
})
export class AppComponent {
	
	private params;

	constructor() {
		this.params = particlesOptions;
	}
}
