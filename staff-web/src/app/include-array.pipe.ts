import { Pipe, PipeTransform } from '@angular/core'
import * as _ from 'lodash'

@Pipe({
  name: 'includeArray',
})
export class IncludeArrayPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    const contain = _.includes(value, args[0])
    if (contain) {
      return '/'
    } else {
      return 'x'
    }
  }
}
