import { AuthenticationStore } from './../core/authentication/state/authentication.store';
import { AuthenticationQuery } from 'src/app/core/authentication/state/authentication.query';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AppRole } from './../core/const/app-role';
import { SupplierStore } from './modules/supplier/state/supplier.store';

export interface Menu {
  title: string;
  link: string;
  requireRole?: string[];
  icon: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  userProfile$ = this.authenticationQuery.userProfile$;
  menuList: Menu[] = [
    {
      title: 'Nhà cung cấp',
      link: 'admin/supplier',
      icon: 'home',
      requireRole: [AppRole.Admin, AppRole.SuperAdmin]
    },
    {
      title: 'Loại sản phẩm',
      link: 'admin/product-type',
      icon: 'appstore',
      requireRole: [AppRole.Admin, AppRole.SuperAdmin]
    },
    {
      title: 'Sản phẩm',
      link: 'admin/product',
      icon: 'shopping',
      requireRole: [AppRole.Admin, AppRole.SuperAdmin]
    },
    {
      title: 'Đơn hàng',
      link: 'admin/order',
      icon: 'shopping-cart',
      requireRole: [AppRole.Admin, AppRole.SuperAdmin]
    },
    {
      title: 'Quản trị',
      link: 'admin/user',
      icon: 'user',
      requireRole: [AppRole.SuperAdmin]
    },
    {
      title: 'Mã giảm giá',
      link: 'admin/sale-code',
      icon: 'barcode',
      requireRole: [AppRole.SuperAdmin, AppRole.Admin]
    }
  ];

  menuSelected$ = new BehaviorSubject<Menu>(this.menuList[0]);
  currentMenuSelected = {} as Menu;
  constructor(
    private readonly router: Router,
    private readonly supplierStore: SupplierStore,
    private readonly authenticationQuery: AuthenticationQuery,
    private readonly authenticationStore: AuthenticationStore
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
      this.resetModuleState();
    }
    this.currentMenuSelected = item;
    this.menuSelected$.next(item);
    this.router.navigate([item.link]);
  }

  resetModuleState(): void {
    this.supplierStore.reset();
  }

  logout(): void {
    this.authenticationStore.reset();
    this.router.navigate(['']);
  }
}
