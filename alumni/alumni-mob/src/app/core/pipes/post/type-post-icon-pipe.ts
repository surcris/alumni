import { Pipe, PipeTransform } from '@angular/core';
import { TypePostIcons } from '../../tools/post/post-mapping';
import { TypePost } from '../../enums/post/type-post-enum'

@Pipe({
  name: 'typePostIcon'
})
export class TypePostIconPipe implements PipeTransform {
  transform(typePost: TypePost): string {
    return TypePostIcons[typePost];
  }
}