import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from './../../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() leftButtonTitle!: string;
  @Input() rightButtonTitle!: string;
  @Output() onClickRightButton = new EventEmitter(); 
  @Output() onClickLeftButton = new EventEmitter();
  @Output() onClickToCard = new EventEmitter();
  @Input() isShowFooter = true;
  constructor() { }

  clickLeftButton(product: Product) {
    this.onClickLeftButton.emit(product);
  }

  clickRightButton(product: Product) {
    this.onClickRightButton.emit(product);
  }

  clickToCard(product: Product) {
    this.onClickToCard.emit(product);
  }
}
