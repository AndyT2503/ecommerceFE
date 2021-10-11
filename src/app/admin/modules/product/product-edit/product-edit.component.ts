import { ProductCategory } from './../../../../shared/models/product.model';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AvailableStatusProduct } from 'src/app/core/const/product-available-status';
import * as XLSX from 'xlsx';
import { ProductQuery } from '../state/product.query';
import { ProductService } from '../state/product.service';
import { FirebaseService } from './../../../../shared/util-services/firebase.service';
import { ProductStore } from './../state/product.store';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  createProductForm!: FormGroup; // ! là khai báo not null
  specialFeatures!: FormArray;
  categories!: FormArray;
  availableStatus = AvailableStatusProduct;
  productTypeList$ = this.productQuery.select(x => x.productTypeList);
  supplierList$ = this.productQuery.select(x => x.supplierList);
  configuration: any[] = [];
  previewImgSrc!: string; // khi upload lên nó sẽ lưu tạm để hiển thị ra
  categoryLogo!: string; // Lấy từ db ra theo category là logo trong bảng category
  fileToUpload: File | null = null;  // File để lưu firsBay
  productId!: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private productQuery: ProductQuery,
    private readonly nzMessage: NzMessageService,
    private readonly activeRoute: ActivatedRoute,
    private readonly firebaseService: FirebaseService,
    private productStore: ProductStore,
  ) { }

  ngOnInit() {
    const queryParams = this.activeRoute.snapshot.queryParams;
    if (queryParams) {
      this.productId = queryParams.productId;
    }
    this.initForm();
    this.getProductTypeList();
    this.getSupplierList();
  }
  initForm() {
    this.createProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      availableStatus: ['', Validators.required],
      originalPrice: ['', Validators.required],
      specialFeatures: this.formBuilder.array([this.createspecialFeatures()]),
      supplierId: ['', Validators.required],
      productTypeId: ['', Validators.required],
      configuration: ['', Validators.required],
      categories: this.formBuilder.array([this.createCategories()]),
    });
    this.specialFeatures = this.createProductForm.get('specialFeatures') as FormArray;
    this.categories = this.createProductForm.get('categories') as FormArray;
  }
  createspecialFeatures(): FormGroup {
    return this.formBuilder.group({
      description: ''
    });
  }

  createCategories(): FormGroup {
    return this.formBuilder.group({
      image: '', // chính là categoryLogo
      name: '',
      price: '',
      fileToUpload: null,
      previewImgSrc: ''
    });
  }

  getProductTypeList(): void {
    const { productTypeList } = this.productQuery.getValue();
    if (productTypeList.length === 0) {
      this.productService.getProductTypes().subscribe();
    }
  }

  getSupplierList(): void {
    const { supplierList } = this.productQuery.getValue();
    if (supplierList.length === 0) {
      this.productService.getSuplliers().subscribe();
    }
  }

  addSpecial() {
    this.specialFeatures = this.createProductForm.get('specialFeatures') as FormArray;
    this.specialFeatures.push(this.createspecialFeatures());
  }

  deleteSpecial(i: number) {
    this.specialFeatures.removeAt(i);
  }

  addCategories() {
    this.categories = this.createProductForm.get('categories') as FormArray;
    this.categories.push(this.createCategories());
  }
  deleteCategories(i: number) {
    this.categories.removeAt(i);
  }

  onFileChange(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      && selectedFile.type != "csv" && selectedFile.type != "application/vnd.ms-excel") {
      this.nzMessage.warning('Vui lòng chọn file excel !');
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      let binaryData = event.target?.result;
      let workbook = XLSX.read(binaryData, { type: 'binary' });
      workbook.SheetNames.forEach(sheet => {
        let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        this.configuration = data;
      });
    };
  }

  handleFileInput(event: Event, i: number) {

    const target = event.target as any;
    const files = target.files;

    this.createProductForm.value.categories[i].fileToUpload = files.item(0);

    const reader = new FileReader();
    reader.onload = e => {
      const imageUrl = reader.result as string;
      this.categories.controls[i].patchValue({previewImgSrc: imageUrl});
    };
    reader.readAsDataURL(this.createProductForm.value.categories[i].fileToUpload!);
  }






  closeEdit(): void {
    this.router.navigate(['admin/product']);
  }

  submit(): void {
    let formCreate = this.createProductForm.value;
    // if (!formCreate.name) {
    //   this.nzMessage.warning('Vui lòng điền name');
    //   return;
    // }
    // if (!formCreate.description) {
    //   this.nzMessage.warning('Vui lòng điền description');
    //   return;
    // }
    // Create new product
    if (!this.productId) {
      formCreate.categories.forEach((m: any) => {
        this.firebaseService.uploadImages(m.fileToUpload!).subscribe(
          url => {
            m.image = url;
          }
        );
      });
      this.createProduct();
    } else {
      //Update Product
      // if (this.fileToUpload) {
      //   this.firebaseService.uploadImages(this.fileToUpload!).subscribe(
      //     url => {
      //       this.supplierLogo = url;
      //       this.updateSupplier();
      //     }
      //   );
      // } else {
      //   this.updateSupplier();
      // }
    }

  }
  createProduct(): void {
    let formCreate = this.createProductForm.value;
    let specialFeaturesCreate: string[] = [];
    let categories: ProductCategory[] = [];
    this.specialFeatures.value.forEach((m: any) => {
      specialFeaturesCreate.push(m.description);
    });
    console.log(this.categories.value);

    // this.categories.value.forEach((m:ProductCategory) => {
    //   categories.push({
    //     name: m.name,
    //     image: m.image,
    //     price: m.price
    //   });
    // });

    var configuration = this.configuration.reduce(
      (obj, item) => Object.assign(obj, { [item.key]: item.description }), {});

    this.productService.createProduct(formCreate.name, formCreate.description, formCreate.status, formCreate.availableStatus,
      formCreate.originalPrice, specialFeaturesCreate, configuration, this.categories.value, formCreate.supplierId, formCreate.productTypeId).subscribe(
        () => {
          this.nzMessage.success('Tạo sản phẩm thành công');
          this.productStore.reset();
          this.router.navigate(['admin/product']);
        },
        (err) => this.nzMessage.error(err.error.detail)
      );
  }

  trackByFn(index: any, item: any) {
    return index;
  }

}
