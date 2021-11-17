import { SaleCode } from './../../../../shared/models/sale-code.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartItem } from './../state/cart.store';
import { CartService } from './../state/cart.service';
import { CartQuery } from './../state/cart.query';
import { Province } from './../../../../shared/models/location-model';
import { LOCATIONDATA } from './../../../../core/data/location.data';
import { Component, OnInit } from '@angular/core';
import { District } from 'src/app/shared/models/location-model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  provinceList = LOCATIONDATA;
  districtList: District[] = [];
  cart$ = this.cartQuery.cart$;
  salePrice = 0;
  totalPrice$ = this.cartQuery.totalPrice$;
  formInfo!: FormGroup;
  isAcceptTermRule = true;
  paymentGate!: string;
  saleCode!: string;
  constructor(
    private readonly cartQuery: CartQuery,
    private readonly cartService: CartService,
    private readonly modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.initFormInfo();
  }

  initFormInfo(): void {
    this.formInfo = new FormGroup(
      {
        name: new FormControl('', [Validators.required]),
        tel: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        province: new FormControl('', [Validators.required]),
        district: new FormControl('', Validators.required),
        address: new FormControl('', [Validators.required]),
        note: new FormControl('')
      }
    );
  }

  validateForm(): boolean {
    Object.values(this.formInfo.controls).forEach(control => {
      control.markAsDirty();
      control.updateValueAndValidity({ onlySelf: true });
    });
    return this.formInfo.valid;
  }

  paymentByCash(): void {
    if (!this.validateForm()) {
      return;
    }
    if (!this.isAcceptTermRule) {
      this.modal.warning({
        nzContent: 'Quý khách vui lòng chấp nhận điều khoản sử dụng để tiếp tục mua hàng',
        nzCentered: true
      });
      return;
    }
    console.log(this.formInfo.value);
  }

  paymentByBank(): void {
    if (!this.validateForm()) {
      return;
    }
    if (!this.isAcceptTermRule) {
      this.modal.warning({
        nzContent: 'Quý khách vui lòng chấp nhận điều khoản sử dụng để tiếp tục mua hàng',
        nzCentered: true
      });
      return;
    }
    if (!this.paymentGate) {
      this.modal.warning({
        nzContent: 'Quý khách vui lòng chọn phương thức thanh toán online',
        nzCentered: true
      });
      return;
    }
    console.log(this.formInfo.value);
  }


  openProvinceSelect(isOpen: boolean): void {
    if (isOpen) {
      this.formInfo.patchValue({ province: '', district: '' });
    }
  }

  provinceChange(provinceCode: string): void {
    if (!provinceCode) {
      return;
    }
    this.districtList = LOCATIONDATA.find(x => x.code === provinceCode)!.districts;
  }

  removeItem(categoryId: string): void {
    this.cartService.removeProduct(categoryId);
  }

  updateQuantity(categoryId: string, quantity: number): void {
    this.cartService.updateQuantityCategory(categoryId, quantity);
  }

  applySaleCode(saleCode: SaleCode): void {
    const now = new Date();
    if (now.getDate() > new Date(saleCode.validUntil).getDate()) {
      this.modal.error({
        nzTitle: 'Mã giảm giá không hợp lệ',
        nzContent: 'Mã giảm giá quá hạn sử dụng',
        nzCentered: true
      });
      return;
    }
    const { totalPrice } = this.cartQuery.getValue();
    if (totalPrice * (saleCode.percent / 100) <= saleCode.maxPrice) {
      this.salePrice = totalPrice * (saleCode.percent / 100);
    } else {
      this.salePrice = saleCode.maxPrice;
    }
  }

  getSaleCode(): void {
    if (!this.saleCode) {
      this.salePrice = 0;
      return;
    }
    this.cartService.getSaleCodeByCode(this.saleCode).subscribe(
      (res) => {
        this.applySaleCode(res);
      },
      (err) => {
        this.modal.error({
          nzTitle: 'Mã giảm giá không hợp lệ',
          nzContent: 'Mã giảm giá không tồn tại',
          nzCentered: true
        });
      }
    );
  }
}
