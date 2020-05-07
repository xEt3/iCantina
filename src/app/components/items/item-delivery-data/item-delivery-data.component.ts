import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-delivery-data',
  templateUrl: './item-delivery-data.component.html',
  styleUrls: ['./item-delivery-data.component.scss'],
})
export class ItemDeliveryDataComponent implements OnInit {

  @Input()mail:string;
  @Input()deliveryDate:string;

  constructor() { }

  ngOnInit() {}

}
