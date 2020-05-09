import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from './image.pipe';
import { DomSanitazerPipe } from './dom-sanitazer.pipe';



@NgModule({
  declarations: [ImagePipe, DomSanitazerPipe],
  imports: [
    CommonModule
  ],
  exports:[ImagePipe,DomSanitazerPipe]
})
export class PipesModule { }
