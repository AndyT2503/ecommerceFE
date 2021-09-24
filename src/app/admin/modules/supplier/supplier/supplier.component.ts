import { Router } from '@angular/router';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PagingModel } from '../../../../shared/models/paging-model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SupplierService } from '../state/supplier.service';
import { SupplierStore } from '../state/supplier.store';
import { Supplier } from 'src/app/shared/models/supplier.model';
import { SupplierQuery } from '../state/supplier.query';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit, OnDestroy {

  supplierPaging$ = this.supplierQuery.select(x => x.supplierPaging);
  searchName = '';
  searchName$ = new Subject<string>();
  destroyed$ = new Subject<void>();

  pageSize = 1;
  constructor(
    private readonly supplierService: SupplierService,
    private readonly supplierQuery: SupplierQuery,
    private readonly nzMessage: NzMessageService,
    private readonly router: Router,
    private readonly supplierStore: SupplierStore
  ) { }

  ngOnInit(): void {
    const filterName = this.supplierStore.getValue().supplierNameFilter;
    let pageIndex = this.supplierStore.getValue().pageIndex;
    if (filterName) {
      this.searchName = filterName;
    }
    if (!pageIndex) {
      pageIndex = 1;
    }
    this.getSupplier(pageIndex, this.searchName);
    this.setupSearchName();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  setupSearchName(): void {
    this.searchName$.pipe( 
      debounceTime(300),
      takeUntil(this.destroyed$)
      ).subscribe(
      (val) => {
        this.getSupplier(1, val);
      }
    );
  }

  onPageIndexChange(pageIndex: number): void {
    this.getSupplier(pageIndex, this.searchName);
  }

  onSearchNameChange(value: string): void {
    this.searchName$.next(value);
  }

  getSupplier(pageIndex: number, name?: string): void {
    this.supplierStore.update({ supplierNameFilter: name, pageIndex: pageIndex, pageSize: this.pageSize });
    this.supplierService.getSupplier(name || '', pageIndex, this.pageSize).subscribe();
  }

  deleteSupplier(id: string): void {
    this.supplierService.deleteSupplier(id).subscribe(
      () => {
        this.nzMessage.success('Xoá nhà cung cấp thành công');
        this.searchName = '';
        this.getSupplier(1);
      },
      (err) => this.nzMessage.error(err.error.detail)
    );
  }

  editSupplier(id: string): void {
    this.router.navigate(['admin/supplier/edit'], {
      queryParams: {
        supplierId: id
      }
    });
  }

}
