import { Injectable } from '@angular/core';
import { TempImage } from './interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TempImagesService {
  tempImages: TempImage[] = [];
  
  constructor() { }
}
