import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sliderImages = [
    {src: 'assets/promotion/slider_1.png'},
    {src: 'assets/promotion/slider_2.png'},
    {src: 'assets/promotion/slider_3.png'},
    {src: 'assets/promotion/slider_4.png'},
    {src: 'assets/promotion/slider_5.png'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
