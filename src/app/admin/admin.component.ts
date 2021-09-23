import { AppRole } from './../core/const/app-role';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SupplierStore } from './../states/supplier/supplier.store';

export interface Menu {
  title: string;
  link: string;
  requireRole?: string[];
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  menuList: Menu[] = [
    {
      title: 'Nhà cung cấp',
      link: 'admin/supplier',
      requireRole: [AppRole.Admin, AppRole.SuperAdmin]
    },
    {
      title: 'Loại sản phẩm',
      link: 'admin/product-type',
      requireRole: [AppRole.Admin, AppRole.SuperAdmin]
    },
    {
      title: 'Sản phẩm',
      link: 'admin/product',
      requireRole: [AppRole.Admin, AppRole.SuperAdmin]
    },
    {
      title: 'Đơn hàng',
      link: 'admin/order',
      requireRole: [AppRole.Admin, AppRole.SuperAdmin]
    },
    {
      title: 'Quản trị',
      link: 'admin/user',
      requireRole: [AppRole.SuperAdmin]
    }
  ];

  menuSelected$ = new BehaviorSubject<Menu>(this.menuList[0]);
  currentMenuSelected = {} as Menu;
  constructor(
    private readonly router: Router,
    private readonly supplierStore: SupplierStore
  ) { }

  ngOnInit(): void {
    const currentUrl = this.router.url.substr(1);
    const currentMenuSelected = this.menuList.find(x => x.link === currentUrl);
    if (!currentMenuSelected) {
      this.currentMenuSelected = this.menuList[0];
    } else {
      this.currentMenuSelected = currentMenuSelected;
    }
    this.menuSelected$.next(this.currentMenuSelected);
  }

  onSelectMenu(item: Menu): void {
    if (item !== this.currentMenuSelected) {
      this.resetAdminModuleState();
    }
    this.currentMenuSelected = item;
    this.menuSelected$.next(item);
    this.router.navigate([item.link]);
  }

  resetAdminModuleState(): void {
    this.supplierStore.reset();
  }

  ngOnDestroy(): void {
    this.resetAdminModuleState();
  }
}
