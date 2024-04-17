import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.coingecko.com/api/v3';

  constructor(private http: HttpClient) {}

  getCurrency(currency: string): Observable<any> {
    const cachedData = localStorage.getItem('currency_' + currency);
    if (cachedData) {
      return of(JSON.parse(cachedData));
    } else {
      return this.http.get<any>(`${this.apiUrl}/coins/markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false`);
    }
  }

  getTrendingCurrency(currency: string): Observable<any> {
    const cachedData = localStorage.getItem('trending_currency_' + currency);
    if (cachedData) {
      return of(JSON.parse(cachedData));
    } else {
      return this.http.get<any>(`${this.apiUrl}/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`);
    }
  }

  getGraphicalCurrencyData(coinId: string, currency: string, days: number): Observable<any> {
    const cachedData = localStorage.getItem('graphical_data_' + coinId);
    if (cachedData) {
      return of(JSON.parse(cachedData));
    } else {
      return this.http.get<any>(`${this.apiUrl}/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`);
    }
  }

  getCurrencyById(coinId: string): Observable<any> {
    const cachedData = localStorage.getItem('currency_by_id_' + coinId);
    if (cachedData) {
      return of(JSON.parse(cachedData));
    } else {
      return this.http.get<any>(`${this.apiUrl}/coins/${coinId}`);
    }
  }
}
