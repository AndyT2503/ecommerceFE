import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.scss']
})
export class SupplierEditComponent implements OnInit {
  fileToUpload: File | null = null;
  previewImgSrc!: string;

  productTypes: { label: string; value: string; checkBox?: boolean }[] = [];
  constructor() { }

  ngOnInit(): void {
    const productTypes = [
      {
        id: '1',
        name: 'Máy tính bảng'
      },
      {
        id: '2',
        name: 'Di động'
      },
      {
        id: '3',
        name: 'Laptop'
      },
      {
        id: '5',
        name: 'Đồng hồ thông minh'
      },
      {
        id: '1',
        name: 'Máy tính bảng'
      },
      {
        id: '2',
        name: 'Di động'
      },
      {
        id: '3',
        name: 'Laptop'
      },
      {
        id: '5',
        name: 'Đồng hồ thông minh'
      },
      
    ];
    this.productTypes = productTypes.map(x => ({
      value: x.id,
      label: x.name
    }));
  }

  handleFileInput(event: Event) {
    const target = event.target as any;
    const files = target.files;
    this.fileToUpload = files.item(0);

    const reader = new FileReader();
    reader.onload = e => this.previewImgSrc = reader.result as string;
    reader.readAsDataURL(this.fileToUpload!);
  }
}
