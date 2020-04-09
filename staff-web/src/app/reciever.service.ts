import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecieverService {
  constructor() {}

  getRecieverData(data) {
    return new Observable((sub) => {
      setTimeout(() => {
        sub.next({
          nationalId: '11111',
          phone: '0899999999',
          firstname: 'Tharit',
          lastname: 'Wichiankoo',
          foodCount: 3,
        });
      }, 3000);
    });
  }
}
