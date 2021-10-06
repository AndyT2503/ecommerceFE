import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AvailableStatusProduct } from 'src/app/core/const/product-available-status';
import { ProductType } from 'src/app/shared/models/product-type.model';
import { ProductQuery } from '../state/product.query';
import { ProductService } from '../state/product.service';
import { ProductStore } from '../state/product.store';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  createProductForm!: FormGroup; // ! là khai báo not null
  specialFeatures! : FormArray;
  availableStatus = AvailableStatusProduct;
  productTypeList$ = this.productQuery.select(x => x.productTypeList);
  supplierList$ = this.productQuery.select(x => x.supplierList);
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private productQuery: ProductQuery
  ) { }

  ngOnInit() {
    this.initForm();
    this.getProductTypeList();
    this.getSupplierList();
  }

  getProductTypeList(): void {
    const {productTypeList} = this.productQuery.getValue();
    if(productTypeList.length === 0) {
      this.productService.getProductTypes().subscribe();
    }

  }
  getSupplierList(): void {
    const {supplierList} = this.productQuery.getValue();
    if(supplierList.length === 0) {
      this.productService.getSuplliers().subscribe();
    }
  }


  initForm(){
    this.createProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      availableStatus : ['', Validators.required],
      originalPrice : ['', Validators.required],
      specialFeatures : this.formBuilder.array([this.createItem()]),
      supplierId : ['', Validators.required],
      productTypeId: ['', Validators.required],
      configuration: ['', Validators.required],
      categories: [[], Validators.required],
    });
    this.specialFeatures = this.createProductForm.get('specialFeatures') as FormArray;
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      description: ''
    });
  }

  addSpecial(){
    this.specialFeatures = this.createProductForm.get('specialFeatures') as FormArray;
    this.specialFeatures.push(this.createItem());
  }






  closeEdit(): void {
    this.router.navigate(['admin/product']);
  }

  submit(): void {
    console.log(this.createProductForm.value);
  }



}
