import { NzMessageService } from 'ng-zorro-antd/message';
import { ProductApiService } from './../../api-services/product-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() nameProduct = '';
  @Input() priceProduct!: number;
  @Input() rate!: number;
  @Input() leftButtonTitle = "";
  @Input() rightButtonTitle = "";
  @Input() slug!: string;
  @Input() countRate!: number;
  isDelete = true;
  isShowDeleteModel = false;
  constructor(private readonly router: Router,
    private productApiService: ProductApiService,
    private readonly nzMessage: NzMessageService) { }

  ngOnInit(){
    if(!this.router.url.includes("admin")){
      this.isDelete = false;
    }
  }
  onEdit(slug: string){
    this.router.navigate(['admin/product/edit'], {
      queryParams: {
        slug: slug
      }
    });
  }
  deleteProduct(slug: string){
    this.productApiService.deleteProduct(slug).subscribe(
        () => {
          this.nzMessage.success('Tạo sản phẩm thành công');
          this.isShowDeleteModel = false;
        },
        (err) => this.nzMessage.error(err.error.detail)
      );
  }

  openDeleteModel(slug: string){
    this.isShowDeleteModel = true;
  }

  closeModal(){
    this.isShowDeleteModel = false;
  }

}
