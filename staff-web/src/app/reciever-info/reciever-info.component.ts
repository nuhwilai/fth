import { Component, OnInit, Input } from '@angular/core'
import { ALLERGIES } from '../core/allergiesType'
import { DISEASE } from '../core/diseaseType'

@Component({
  selector: 'app-reciever-info',
  templateUrl: './reciever-info.component.html',
  styleUrls: ['./reciever-info.component.scss'],
})
export class RecieverInfoComponent implements OnInit {
  @Input() set recieverInfo(data) {
    this.recieverData = data
    this.prepareData(data)
  }

 
  recieverData
  members
  ALLERGIES
  DISEASE
  constructor() {}

  ngOnInit() {
    this.ALLERGIES = ALLERGIES
    this.DISEASE = DISEASE
  }

  prepareData(data) {
    if (data) {
      this.members = data.members
    }
  }
}
