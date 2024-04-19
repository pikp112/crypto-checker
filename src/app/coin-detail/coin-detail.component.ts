import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CurrencyService } from '../service/currency.service';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrl: './coin-detail.component.scss'
})
export class CoinDetailComponent implements OnInit {
  coinData: any;
  coinId: number;
  days: number = 30;
  currency: string = "EUR";
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#009688',
        pointBackgroundColor: '#009688',
        pointBorderColor: '#009688',
        pointHoverBackgroundColor: '#009688',
        pointHoverBorderColor: '#009688',

      }
    ],
    labels: []
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1
      }
    },

    plugins: {
      legend: { display: true },
    }
  };
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart !: BaseChartDirective;

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute, private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.coinId = params['id'];
    });
    this.getCoinData();
    this.getGraphData(this.days);
    this.currencyService.getCurrency().subscribe(currency => {
      this.currency = currency;
      this.getGraphData(this.days);
      this.getCoinData();
    });
  }
  getCoinData() {
    this.api.getCurrencyById(this.coinId).subscribe(data => {
      this.coinData = data;
      if (this.currency === 'USD') {
        data.market_data.current_price.eur = data.market_data.current_price.usd;
        data.market_data.market_cap.eur = data.market_data.market_cap.usd;
      }
      data.market_data.current_price.eur = data.market_data.current_price.eur;
      data.market_data.market_cap.eur = data.market_data.market_cap.eur;
      this.coinData = data;
    });
  }
  getGraphData(days: number) {
    this.days = days;
    this.api.getGraphicalCurrencyData(this.coinId, this.currency, this.days).subscribe(data => {
      setTimeout(() => {
        this.myLineChart.chart?.update();
      }, 200)
      this.lineChartData.datasets[0].data = data.prices.map((price: any) => price[1]);
      this.lineChartData.datasets[0].label = data.prices.map((price: any) => {
        let date = new Date(price[0]);
        let time = date.getHours() > 12 ?
        `${date.getHours() - 12}: ${date.getMinutes()} PM` :
        `${date.getHours()}: ${date.getMinutes()} AM`;
        return this.days === 1 ? time : date.toLocaleDateString();
      });
    });
  }
}
