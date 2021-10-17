import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AvailableStatusProduct } from 'src/app/core/const/product-available-status';
import * as XLSX from 'xlsx';
import { ProductQuery } from '../state/product.query';
import { ProductService } from '../state/product.service';
import { Product } from './../../../../shared/models/product.model';
import { FirebaseService } from './../../../../shared/util-services/firebase.service';
import { ProductStore } from './../state/product.store';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  createProductForm!: FormGroup; // ! là khai báo not null
  categories!: FormArray;
  availableStatus = AvailableStatusProduct;
  productTypeList$ = this.productQuery.select(x => x.productTypeList);
  supplierList$ = this.productQuery.select(x => x.supplierList);
  configuration!: FormArray;
  previewImgSrc!: string; // khi upload lên nó sẽ lưu tạm để hiển thị ra
  categoryLogo!: string; // Lấy từ db ra theo category là logo trong bảng category
  fileToUpload: File | null = null;  // File để lưu firsBay
  // slug!: string;
  product: Product | null = null;
  specialOnEnter = new FormControl('');
  public configurationEditor = ClassicEditor;
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
    // *********************TODO : Get slug + get Product when edit
    // const queryParams = this.activeRoute.snapshot.queryParams;
    // if (queryParams) {
    //   this.slug = queryParams.slug;
    // }
    // this.getProduct();
    this.initForm();
    this.getProductTypeList();
    this.getSupplierList();
  }
  // *********************TODO: Get Product
  // getProduct() {
  //   this.initForm();
  //   if (this.slug) {
  //     this.productService.getProductBySlug(this.slug).subscribe(
  //       {
  //         next: (res) => this.product = res,

  //         complete: () => this.setValueForm()

  //       }
  //     );
  //   }
  // }
  // *******************TODO:  Set Form when Edit
  // setValueForm() {
  //   this.createProductForm.patchValue({ name: this.product?.name });
  //   this.createProductForm.patchValue({ description: this.product?.description });
  //   this.createProductForm.patchValue({ status: this.product?.status });
  //   this.createProductForm.patchValue({ availableStatus: this.product?.availableStatus });
  //   this.createProductForm.patchValue({ originalPrice: this.product?.originalPrice });
  //   this.createProductForm.patchValue({ specialFeatures: this.product?.specialFeatures });
  //   this.createProductForm.patchValue({ supplierId: this.product?.supplierId });
  //   this.createProductForm.patchValue({ productTypeId: this.product?.productTypeId });
  //   while (this.configuration.length !== 0) {
  //     this.configuration.removeAt(0);
  //   }
  //   this.product?.configuration?.forEach((m:any,i:number) => {
  //     if(m.key && m.description){
  //       this.configuration = this.createProductForm.get('configuration') as FormArray;
  //       this.configuration.push(this.createConfiguration("", ""));
  //       this.configuration.controls[i].patchValue({ key: m.key, description: m.description });
  //     }
  //   });
  //   while (this.categories.length !== 0) {
  //     this.categories.removeAt(0);
  //   }
  //   this.product?.categories?.forEach((m,i) => {
  //       this.categories = this.createProductForm.get('categories') as FormArray;
  //       this.categories.push(this.createCategories());
  //       this.categories.controls[i].patchValue({ name: m.name, price: m.price,image: m.image, id: m.id  });
  //   });
  // }

  initForm() {
    this.createProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      availableStatus: ['', Validators.required],
      originalPrice: ['', Validators.required],
      specialFeatures: [[]],
      supplierId: ['', Validators.required],
      productTypeId: ['', Validators.required],
      configuration: this.formBuilder.array([this.createConfiguration("", "")]),
      categories: this.formBuilder.array([this.createCategories()]),
    });
    this.categories = this.createProductForm.get('categories') as FormArray;
    this.configuration = this.createProductForm.get('configuration') as FormArray;
  }

  createCategories(): FormGroup {
    return this.formBuilder.group({
      image: '', // chính là categoryLogo
      name: '',
      price: '',
      fileToUpload: {} as File,
      previewImgSrc: ''
    });
  }

  createConfiguration(key: string, description: string): FormGroup {
    return this.formBuilder.group({
      key: '',
      description: ''
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
      this.productService.getSuppliers().subscribe();
    }
  }

  onAddSpecialFeatures(event: any) {
    if (event.target.value) {
      this.createProductForm.value.specialFeatures.push(event.target.value);
    }
    this.specialOnEnter.setValue('');
  }

  onDeleteSpecialFeatures(i: number) {
    this.createProductForm.value.specialFeatures.splice(i, 1);
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
        // Remove Formarray configuration
        while (this.configuration.length !== 0) {
          this.configuration.removeAt(0);
        }
        // set FormArray
        data.forEach((m: any, i) => {
          if (m.key && m.description) {
            this.configuration = this.createProductForm.get('configuration') as FormArray;
            this.configuration.push(this.createConfiguration("", ""));
            this.configuration.controls[i].patchValue({ key: m.key, description: m.description });
          }
        });
      });
    };
  }

  handleFileInput(event: Event, i: number) {

    const target = event.target as any;
    const files = target.files;

    this.categories.controls[i].patchValue({ fileToUpload: files.item(0) });

    const reader = new FileReader();
    reader.onload = e => {
      const imageUrl = reader.result as string;
      this.categories.controls[i].patchValue({ previewImgSrc: imageUrl });
    };
    reader.readAsDataURL(this.createProductForm.value.categories[i].fileToUpload!);
  }

  closeEdit(): void {
    this.router.navigate(['admin/product']);
  }

  submit(): void {
    let formCreate = this.createProductForm.value;
    console.log(formCreate);

    if (!formCreate.name) {
      this.nzMessage.warning('Vui lòng điền name');
      return;
    }
    if (!formCreate.description) {
      this.nzMessage.warning('Vui lòng điền description');
      return;
    }
    // const uploadImages$ = formCreate.categories.map((x: any) => this.firebaseService.uploadImages(x.fileToUpload!).pipe(tap(url => x.image = url)));
    // forkJoin(uploadImages$).subscribe(
    //   {
    //     complete: () => this.createProduct()
    //   }
    // );
    // **************************TODO: IF CREATE ELSE UPDATE
    // Create new product
    // if (!this.slug) {
    //   const uploadImages$ = formCreate.categories.map((x: any) => this.firebaseService.uploadImages(x.fileToUpload!).pipe(tap(url => x.image = url)));
    //   forkJoin(uploadImages$).subscribe(
    //     {
    //       complete: () => this.createProduct()
    //     }
    //   );
    // } else {
    //   Update Product
    //   if (this.fileToUpload) {
    //     this.firebaseService.uploadImages(this.fileToUpload!).subscribe(
    //       url => {
    //         this.supplierLogo = url;
    //         this.updateSupplier();
    //       }
    //     );
    //   } else {
    //     this.updateSupplier();
    //   }
    // }

  }
  createProduct(): void {
    let formCreate = this.createProductForm.value;
    this.productService.createProduct(formCreate.name, formCreate.description, formCreate.status, formCreate.availableStatus,
      formCreate.originalPrice, formCreate.specialFeatures, formCreate.configuration, formCreate.categories, formCreate.supplierId, formCreate.productTypeId).subscribe(
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
