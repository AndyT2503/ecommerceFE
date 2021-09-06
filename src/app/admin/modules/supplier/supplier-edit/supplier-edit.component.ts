import { SupplierService } from './../../../../states/supplier/supplier.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProductType } from 'src/app/states/product-type/product-type.model';
import { ProductTypeService } from './../../../../states/product-type/product-type.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

export interface ProductTypeCheckBox extends ProductType {
  isSelected: boolean;
}
@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.scss']
})
export class SupplierEditComponent implements OnInit {
  fileToUpload: File | null = null;
  previewImgSrc!: string;
  productTypeIdsSelected: string[] = [];
  productTypes: ProductTypeCheckBox[] = [];
  supplierName!: string;
  supplierCode!: string;
  supplierLogo!: string;
  supplierId!: string;
  constructor(
    private readonly productTypeService: ProductTypeService,
    private readonly fireStorage: AngularFireStorage,
    private readonly activeRoute: ActivatedRoute,
    private readonly nzMessage: NzMessageService,
    private readonly supplierService: SupplierService,
    private readonly router: Router) { }

  ngOnInit(): void {
    const queryParams = this.activeRoute.snapshot.queryParams;
    if (queryParams) {
      this.supplierId = queryParams.supplierId;
    }
    this.getProductType();
  }

  getProductType(): void {
    this.productTypeService.getProductType('').subscribe(x => {
      this.productTypes = x.map(item => ({ ...item, isSelected: false }));
      if (this.supplierId) {
        this.getSupplierId(this.supplierId);
      }
    });
  }

  onCheckBoxChange(values: string[]): void {
    this.productTypeIdsSelected = values;
  }

  getSupplierId(id: string): void {
    this.supplierService.getSupplierById(id).subscribe(res => {
      this.supplierLogo = res.logo;
      this.supplierCode = res.code;
      this.supplierName = res.name;
      this.productTypes = this.productTypes.map(item => {
        item.isSelected = res.productTypes.some(x => x.id === item.id);
        return item;
      });
    })
  }

  handleFileInput(event: Event) {
    const target = event.target as any;
    const files = target.files;
    this.fileToUpload = files.item(0);

    const reader = new FileReader();
    reader.onload = e => this.previewImgSrc = reader.result as string;
    reader.readAsDataURL(this.fileToUpload!);
  }

  submit(): void {
    if (!this.supplierCode && !this.supplierName) {
      this.nzMessage.warning('Hãy điền đầy đủ thông tin');
      return;
    }
    if (!this.supplierId && !this.fileToUpload) {
      this.nzMessage.warning('Hãy upload logo');
      return;
    }
    // Create new supplier
    if (!this.supplierId) {
      const uploadFirebase = this.handleUploadFileToFirebase();
      const fileRef = uploadFirebase.fileRef;
      const task = uploadFirebase.task;
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.supplierLogo = url;
            this.createSupplier();
          });
        })
      ).subscribe();
    } else {
      //Update Supplier Info
      if (this.fileToUpload) {
        const uploadFirebase = this.handleUploadFileToFirebase();
        const fileRef = uploadFirebase.fileRef;
        const task = uploadFirebase.task;
        task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.supplierLogo = url;
              this.updateSupplier();
            });
          })
        ).subscribe();
      } else {
        this.updateSupplier();
      }
    }

  }

  handleUploadFileToFirebase(): { task: AngularFireUploadTask; fileRef: AngularFireStorageReference } {
    const now = Date.now();
    const nameImg = `images/${this.fileToUpload?.name}${now}`;
    const fileRef = this.fireStorage.ref(nameImg);
    const task = this.fireStorage.upload(nameImg, this.fileToUpload);
    return ({
      task,
      fileRef
    });
  }

  closeEdit(): void {
    this.router.navigate(['admin/supplier']);
  }

  createSupplier(): void {
    this.supplierService.createSupplier(this.supplierName, this.supplierCode, this.supplierLogo, this.productTypeIdsSelected).subscribe(
      () => {
        this.nzMessage.success('Tạo nhà cung cấp thành công');
        this.router.navigate(['admin/supplier'])
      },
      (err) => this.nzMessage.error(err.error.detail)
    )
  }

  updateSupplier(): void {
    this.supplierService.updateSupplier(this.supplierId, this.supplierName, this.supplierCode, this.supplierLogo, this.productTypeIdsSelected).subscribe(
      () => {
        this.nzMessage.success('Cập nhật thông tin nhà cung cấp thành công');
        this.router.navigate(['admin/supplier'])
      },
      (err) => this.nzMessage.error(err.error.detail)
    )
  }
}
