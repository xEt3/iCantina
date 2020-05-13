import { Component, OnInit, Input } from '@angular/core';
import { ProductOrder } from '../../../../../model/productOrder';

@Component({
  selector: 'app-slideshow-cart',
  templateUrl: './slideshow-cart.component.html',
  styleUrls: ['./slideshow-cart.component.scss'],
})
export class SlideshowCartComponent implements OnInit {

  @Input() productsOrder: ProductOrder[] = []


  slidesOpt = {
    slidesPerView: 1,
    breakpoints: {
      // when window width is <= 720px
      300: {
        slidesPerView: 1.2
      },
      400: {
        slidesPerView: 1.3
      },
      600: {
        slidesPerView: 1.6
      },
      720: {
        slidesPerView: 1.7
      },
      // when window width is <= 999px
      999: {
        slidesPerView: 2.2
      },
      1200: {
        slidesPerView: 3.1
      }
    },
    freeMode: true
  };

  constructor() { }

  ngOnInit() { }

}
