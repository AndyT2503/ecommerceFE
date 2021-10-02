import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() nameProduct = 'iPhone 13 | Chính hãng VN/A';
  @Input() priceProduct = 23490000;
  @Input() rate = 2;
  leftButtonTitle: string = "";
  rightButtonTitle: string = "";
  constructor() { }

  ngOnInit(): void {
    this.leftButtonTitle = "Edit";
    this.rightButtonTitle = "Delete";
  }

}
