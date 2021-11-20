import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-tracking-timeline',
  templateUrl: './order-tracking-timeline.component.html',
  styleUrls: ['./order-tracking-timeline.component.scss']
})
export class OrderTrackingTimelineComponent implements OnInit {
  orderTel!: string;
  orderCode!: string;
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getQueryParamsInfo();
  }

  getQueryParamsInfo(): void {
    this.orderTel = this.activatedRoute.snapshot.queryParams.tel;
    this.orderCode = this.activatedRoute.snapshot.queryParams.code;
  }

  goToOrderDetail(): void {
    this.router.navigate(['/order-tracking/info'], {
      queryParams: {
        code: this.orderCode,
        tel: this.orderTel
      }
    });
  }
}
