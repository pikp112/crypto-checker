import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrl: './coin-list.component.scss'
})
export class CoinListComponent implements OnInit{

  bannerData: any;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];

  constructor(private api: ApiService, private router:Router) { }
  
  ngOnInit(): void {
    this.getAllData();
    this.getBannerData();
  }

  getBannerData(){
    this.api.getTrendingCurrency('EUR')
    .subscribe(data => {
      console.log(data);
      this.bannerData = data;
    });
  }

  getAllData(){
    this.api.getCurrency('EUR')
    .subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goToDetails(row: any){
    this.router.navigate(['coin-detail',row.id])
}
}