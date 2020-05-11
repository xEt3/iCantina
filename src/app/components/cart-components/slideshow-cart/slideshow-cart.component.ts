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
        slidesPerView: 1.5
      },
      600: {
        slidesPerView: 1.8
      },
      720: {
        slidesPerView: 1.9
      },
      // when window width is <= 999px
      999: {
        slidesPerView: 2.4
      },
      1200: {
        slidesPerView: 3.4
      }
    },
    freeMode: true
  };

  constructor() { }

  ngOnInit() { }

}
