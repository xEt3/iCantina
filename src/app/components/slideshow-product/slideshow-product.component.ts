import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../interfaces/ProductInterfaces';

@Component({
  selector: 'app-slideshow-product',
  templateUrl: './slideshow-product.component.html',
  styleUrls: ['./slideshow-product.component.scss'],
})
export class SlideshowProductComponent implements OnInit {

  @Input()products:Product[]=[]

  slidesOpt={
    slidesPerView: 2.4,
    loop:true,
    breakpoints: {
      // when window width is <= 720px
      720: {
          slidesPerView: 3.2
      },
      // when window width is <= 999px
      999: {
          slidesPerView: 6.2
          
      }},
    freeMode: true
  };

  constructor() { }


  ngOnInit() {}

}
