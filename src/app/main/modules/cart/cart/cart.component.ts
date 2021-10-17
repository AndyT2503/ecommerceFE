import { Province } from './../../../../shared/models/location-model';
import { LOCATIONDATA } from './../../../../core/data/location.data';
import { Component, OnInit } from '@angular/core';
import { District } from 'src/app/shared/models/location-model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  provinceList = LOCATIONDATA;
  districtList: District[] = [];
  // TODO: user form control
  provinceSelected!: Province;
  constructor() { }

  ngOnInit(): void {
    //TODO: implement something
    console.log();
  }

  provinceChange(provinceCode: string): void {
    this.districtList = LOCATIONDATA.find(x => x.code === provinceCode)!.districts;
  }
}
