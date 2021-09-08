import { Observable, Subject } from 'rxjs';
import { ProductTypeService } from './../../../../states/product-type/product-type.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductType } from 'src/app/states/product-type/product-type.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { debounceTime, startWith, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent implements OnInit, OnDestroy {

  productTypes: ProductType[] = [];
  isAdding = false;
  newProductType: {
    name: string;
    code: string;
  } = {
      code: '',
      name: ''
    };

  filterName = '';

  editCache: { [key: string]: { edit: boolean; data: ProductType } } = {};

  searchName$ = new Subject<string>();

  destroyed$ = new Subject<void>();
  constructor(
    private readonly productTypeService: ProductTypeService,
    private readonly nzMessage: NzMessageService
  ) { }

  ngOnInit(): void {
    this.setupFilterName();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  setupFilterName(): void {
    this.searchName$
      .pipe(
        takeUntil(this.destroyed$),
        startWith(''),
        debounceTime(300),
        switchMap(val => this.getProductType(val))).subscribe(res => {
          this.productTypes = res;
          this.updateEditCache();
        });
  }

  onFilterNameChange(value: string): void {
    this.searchName$.next(value);
  }

  getProductType(name?: string): Observable<ProductType[]> {
    return this.productTypeService.getProductType(name || '');
  }

  updateEditCache(): void {
    this.productTypes.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  createProductType(name: string, code: string): void {
    this.productTypeService.createProductType(name, code).subscribe(() => {
      this.nzMessage.success('Tạo loại sản phẩm thành công');
      this.searchName$.next('');
      this.filterName = '';
      this.closeAddRow();
    },
      (err) => this.nzMessage.error(err.error.detail));
  }

  saveNewItem(): void {
    this.createProductType(this.newProductType.name, this.newProductType.code);
  }

  closeAddRow(): void {
    this.newProductType.code = '';
    this.newProductType.name = '';
    this.isAdding = false;
  }

  deleteProductType(id: string): void {
    this.productTypeService.deleteProductType(id).subscribe(() => {
      this.nzMessage.success('Xoá loại sản phẩm thành công');
      this.searchName$.next('');
    },
      (err) => this.nzMessage.error(err.error.detail));
  }

  onEditClick(id: string): void {
    this.editCache[id].edit = true;
  }

  closeEdit(id: string): void {
    const index = this.productTypes.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.productTypes[index] },
      edit: false
    };
  }

  saveEditItem(editItem: { edit: boolean; data: ProductType }): void {
    this.productTypeService.updateProductType(editItem.data.id, editItem.data.name, editItem.data.code).subscribe(
      () => {
        editItem.edit = false;
        this.nzMessage.success('Cập nhật loại sản phẩm thành công');
        const index = this.productTypes.findIndex(item => item.id === editItem.data.id);
        Object.assign(this.productTypes[index], editItem.data);
      },
      (err) => this.nzMessage.error(err.error.detail)
    );
  }

}
