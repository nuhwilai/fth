import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupplyService {
  constructor() {}

  listSupply() {
    return new Observable((sub) => {
      sub.next([
        {
          id: 1,
          title: 'supply1',
          date: '2018-01-01',
        },
        {
          id: 2,
          title: 'supply2',
          date: '2018-01-03',
        },
        {
          id: 3,
          title: 'supply3',
          date: '2018-01-10',
        },
        {
          id: 4,
          title: 'supply4',
          date: '2018-01-11',
        },
      ]);
    });
  }

  createSupply() {}

  updateSupply() {}

  deleteSupply() {}
}
