import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const url = environment.url


@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(image: string, userId:string): string {
    return `${url}/product/image/${userId}/${image}`;
  }


}
