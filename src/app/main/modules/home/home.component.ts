import { Supplier } from './../../../states/supplier/supplier.model';
import { SupplierService } from './../../../states/supplier/supplier.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sliderImages = [
    {src: 'assets/promotion/slider_1.png'},
    {src: 'assets/promotion/slider_2.png'},
    {src: 'assets/promotion/slider_3.png'},
    {src: 'assets/promotion/slider_4.png'},
    {src: 'assets/promotion/slider_5.png'},
  ];

  hotSuppliers: Supplier[] = [];
  constructor(private readonly supplierService: SupplierService) { }

  ngOnInit(): void {
    this.getHotSupplier();
  }

  getHotSupplier(): void {
    this.supplierService.getSupplier('', 1, 4).subscribe(
      res => this.hotSuppliers = res.items
    );
  }
}
