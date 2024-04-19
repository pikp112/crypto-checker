import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private selectedCurrency$: BehaviorSubject<string> = new BehaviorSubject('EUR');

  constructor() { }

  getCurrency(){
    return this.selectedCurrency$.asObservable();
  }

  setCurrency(currency: string){
    this.selectedCurrency$.next(currency); // with next will update the value of the observable
  }
}
