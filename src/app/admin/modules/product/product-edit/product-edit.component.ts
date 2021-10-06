import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AvailableStatusProduct } from 'src/app/core/const/product-available-status';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  createProductForm!: FormGroup;
  availableStatus = AvailableStatusProduct;
  array = [1,2,3];
  constructor(private formBuilder: FormBuilder,
              private router: Router) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    this.createProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      availableStatus : ['', Validators.required],
      originalPrice : ['', Validators.required],
      specialFeatures : [new FormArray([]), Validators.required],
      supplierId : ['', Validators.required],
      productTypeId: ['', Validators.required],
      configuration: ['', Validators.required],
      categories: [[], Validators.required],
    });
  }

  closeEdit(): void {
    this.router.navigate(['admin/product']);
  }

  submit(): void {
    console.log(this.createProductForm.value);

  }

  addSpecial(){
    this.array.splice(0,1);
    console.log(this.array);

  }

}
