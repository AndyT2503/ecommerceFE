import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-tracking-info',
  templateUrl: './order-tracking-info.component.html',
  styleUrls: ['./order-tracking-info.component.scss']
})
export class OrderTrackingInfoComponent implements OnInit {
  orderTel!: string;
  orderCode!: string;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.getQueryParamsInfo();
  }

  getQueryParamsInfo(): void {
    this.orderTel = this.activatedRoute.snapshot.queryParams.tel;
    this.orderCode = this.activatedRoute.snapshot.queryParams.code;
  }

  goTimelinePage(): void {
    this.router.navigate(['/order-tracking/timeline'], {
      queryParams: {
        code: this.orderCode,
        tel: this.orderTel
      }
    });
  }
}
