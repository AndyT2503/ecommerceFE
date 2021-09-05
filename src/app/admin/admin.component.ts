import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

export interface Menu {
  title: string;
  link: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  menuList: Menu[] = [
    {
      title: 'Nhà cung cấp',
      link: 'admin/supplier'
    },
    {
      title: 'Loại sản phẩm',
      link: 'admin/product-type'
    },
    {
      title: 'Sản phẩm',
      link: 'admin/product'
    },
    {
      title: 'Đơn hàng',
      link: 'admin/order'
    },
    {
      title: 'Quản trị',
      link: 'admin/user'
    }
  ];

  menuSelected$ = new BehaviorSubject<Menu>(this.menuList[0]);
  constructor(private readonly router: Router) { }

  ngOnInit(): void {
    const currentUrl = this.router.url.substr(1);
    const currentMenuSelected = this.menuList.find(x => x.link === currentUrl);
    if (!currentMenuSelected) {
      this.menuSelected$.next(this.menuList[0]);
      return;
    }
    this.menuSelected$.next(currentMenuSelected);
  }

  onSelectMenu(item: Menu): void {
    this.menuSelected$.next(item);
    this.router.navigate([item.link]);
  }

}
