import { Component } from '@angular/core';

@Component({
	selector: 'app-spinner',
	templateUrl: './customSpinner.component.html',
	styleUrls: ['./customSpinner.component.css']
})

export class CustomSpinnerComponent {

	/* Set up for progress spinner */
	color = 'primary';
	mode =  'indeterminate';
	diameter = 50;
	strokeWidth = 5;
	
}