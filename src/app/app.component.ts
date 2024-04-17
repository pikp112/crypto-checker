import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  selectedCurrency: string = 'EUR';
  constructor() {}
  sendCurrency(event: string){
    console.log(event);
  }
}
