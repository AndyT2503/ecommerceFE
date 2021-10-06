import { debounceTime, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductService } from '../state/product.service';
import { ProductQuery } from '../state/product.query';
import { ProductStore } from '../state/product.store';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  list = [1,2,3,4,5,6,7,8,9,10,11,12];
  productPaging$ = this.productQuery.productPaging$;
  searchNameForm = new FormControl('');
  destroyed$ = new Subject<void>();

  pageSize = 10;
  constructor(
    private readonly productService: ProductService,
    private readonly productQuery: ProductQuery,
    private readonly nzMessage: NzMessageService,
    private readonly router: Router,
    private readonly productStore: ProductStore
  ) { }
     // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    const filterName = this.productStore.getValue().productNameFilter;
    let pageIndex = this.productStore.getValue().pageIndex;
    if (filterName) {
      this.searchNameForm.setValue(filterName);
    }
    if (!pageIndex) {
      pageIndex = 1;
    }
    this.getProduct(pageIndex, this.searchNameForm.value);
    this.setupSearchName();
  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  setupSearchName(): void {
    this.searchNameForm.valueChanges.pipe(
      debounceTime(300),
      takeUntil(this.destroyed$)
      ).subscribe(
      (val) => {
        this.getProduct(1, val);
      }
    );
  }
  getProduct(pageIndex: number, name?: string): void {
    this.productStore.update({ supplierNameFilter: name, pageIndex: pageIndex, pageSize: this.pageSize });
    this.productService.getProduct(name || '', pageIndex, this.pageSize).subscribe();
  }

}
