import { Component, OnInit } from '@angular/core';
import { SupplyService } from '../supply.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  displayDialog: boolean;

  supply: any = {};

  selectedSupply: any;

  newSupply: boolean;

  supplies: any[];

  cols: any[];

  constructor(private supplyService: SupplyService) {}

  ngOnInit() {
    this.supplyService
      .listSupply()
      .subscribe((supply: any) => (this.supplies = supply));

    this.cols = [
      { field: 'title', header: 'Title' },
      { field: 'date', header: 'Date' },
    ];
  }

  showDialogToAdd() {
    this.newSupply = true;
    this.supply = {};
    this.displayDialog = true;
  }

  save() {
    let supplies = [...this.supplies];
    if (this.newSupply) supplies.push(this.supply);
    else supplies[this.supplies.indexOf(this.selectedSupply)] = this.supply;

    this.supplies = supplies;
    this.supply = null;
    this.displayDialog = false;
  }

  delete() {
    let index = this.supplies.indexOf(this.selectedSupply);
    this.supplies = this.supplies.filter((val, i) => i != index);
    this.supply = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newSupply = false;
    this.supply = this.cloneCar(event.data);
    this.displayDialog = true;
  }

  cloneCar(c: any): any {
    let car = {};
    for (let prop in c) {
      car[prop] = c[prop];
    }
    return car;
  }
}
