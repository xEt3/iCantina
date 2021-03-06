import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../interfaces/ProductInterfaces';

@Component({
  selector: 'app-slideshow-product',
  templateUrl: './slideshow-product.component.html',
  styleUrls: ['./slideshow-product.component.scss'],
})
export class SlideshowProductComponent implements OnInit {

  @Input()products:Product[]=[]

  slidesOpt={
    slidesPerView: 2,
    breakpoints: {
      // when window width is <= 720px
      720: {
          slidesPerView: 3.2
      },
      // when window width is <= 999px
      999: {
          slidesPerView: 4.6
          
      }},
    freeMode: true
  };

  constructor() { }


  ngOnInit() {}

}
