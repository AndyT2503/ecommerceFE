import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SaleCode } from './../../../../shared/models/sale-code.model';
import { SaleCodeQuery } from './../state/sale-code.query';
import { SaleCodeService } from './../state/sale-code.service';

@Component({
  selector: 'app-sale-code',
  templateUrl: './sale-code.component.html',
  styleUrls: ['./sale-code.component.scss']
})
export class SaleCodeComponent implements OnInit {
  saleCodePaging$ = this.saleCodeQuery.select(x => x.saleCodePaging).pipe(tap((res) => this.saleCodeList = res?.items));;
  filterName = '';
  isCreateSaleCodeModalVisible = false;
  isEditSaleCodeModalVisible = false;
  createSaleCodeForm!: FormGroup;
  pageSize = 10;
  editCache: { [key: string]: { edit: boolean; data: SaleCode } } = {};
  saleCodeList: SaleCode[] = [];
  constructor(private formBuilder: FormBuilder,
    private readonly saleCodeQuery: SaleCodeQuery,
    private readonly saleCodeService: SaleCodeService,
    private readonly nzMessage: NzMessageService) { }

  ngOnInit(): void {
    this.createSaleCodeForm = this.formBuilder.group({
      code: ['', Validators.required],
      percent: ['', Validators.required],
      maxPrice: ['', Validators.required],
      validUntil: ['', Validators.required],
    });
    this.getSaleCodes(1);
  }
  getSaleCodes(pageIndex: number, code?: string): void {
    this.saleCodeService.getSaleCodes(pageIndex, this.pageSize, code || '').subscribe((res) => {
      this.updateEditCache(res.items);
    });
  }

  updateEditCache(saleCodes: SaleCode[]): void {
    saleCodes.forEach(item => {
      this.editCache[item.code] = {
        edit: false,
        data: { ...item }
      };
    });
  }


  openCreateModal() {
    this.isCreateSaleCodeModalVisible = true;
  }

  closeCreateModal(): void {
    this.isCreateSaleCodeModalVisible = false;
  }
  closeEditModal(): void {
    this.isEditSaleCodeModalVisible = false;
  }

  createSaleCode(): void {
    const value = this.createSaleCodeForm.value;
    if (this.createSaleCodeForm.invalid) {
      this.nzMessage.warning('Vui lòng điền đầy đủ thông tin');
      return;
    }
    this.saleCodeService.createSaleCode(value.code, value.percent, value.maxPrice, value.validUntil)
      .subscribe(() => {
        this.nzMessage.success('Tạo mã giảm giá thành công');
        this.getSaleCodes(1);
        this.closeCreateModal();
      },
        (err) => this.nzMessage.error(err.error.detail)
      );
  }

  editSaleCode(code: string): void {
    this.isEditSaleCodeModalVisible = true;
    this.editCache[code].edit = true;
  }

  closeEdit(code: string): void {
    const index = this.saleCodeList.findIndex(item => item.code === code);
    this.editCache[code] = {
      data: { ...this.saleCodeList[index] },
      edit: false
    };
  }

  saveEditItem(item: { edit: boolean; data: SaleCode }) {
    this.saleCodeService.updateSaleCode(item.data.code, item.data.percent, item.data.maxPrice, item.data.validUntil).subscribe(
      () => {
        item.edit = false;
        this.nzMessage.success('Cập nhật thông tin mã giảm giá thành công');
        this.getSaleCodes(1);
      },
      (err) => this.nzMessage.error(err.error.detail)
    );
  }

  onPageIndexChange(index: number): void {
  }
  deleteSaleCode(code: string): void {
    this.saleCodeService.deleteSaleCode(code).subscribe(
      () => {
        this.nzMessage.success('Xoá mã giảm giá thành công');
        this.getSaleCodes(1);
      },

      (err) => this.nzMessage.error(err.error.detail)
    );
  }
  onFilterNameChange(value: string): void {
  }

}
