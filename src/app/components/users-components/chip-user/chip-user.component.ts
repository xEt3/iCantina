import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../interfaces/UserInterfaces';

@Component({
  selector: 'app-chip-user',
  templateUrl: './chip-user.component.html',
  styleUrls: ['./chip-user.component.scss'],
})
export class ChipUserComponent implements OnInit {

  @Input()user:User;
  @Input()text:string;
  @Input()color:string="primary";

  constructor() { }

  ngOnInit() {}

}
