import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../interfaces/ProductInterfaces';
import { ProductOrder } from '../../../../model/productOrder';

@Component({
  selector: 'app-slideshow-cart',
  templateUrl: './slideshow-cart.component.html',
  styleUrls: ['./slideshow-cart.component.scss'],
})
export class SlideshowCartComponent implements OnInit {

  @Input()productsOrder:ProductOrder[]=[]


  slidesOpt={
    slidesPerView: 2.4,
    breakpoints: {
      // when window width is <= 720px
      720: {
          slidesPerView: 4.2
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
