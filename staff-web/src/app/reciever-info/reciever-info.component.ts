import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-reciever-info',
  templateUrl: './reciever-info.component.html',
  styleUrls: ['./reciever-info.component.scss'],
})
export class RecieverInfoComponent implements OnInit {
  @Input() set recieverInfo(data) {
    this.recieverData = data
  }

  recieverData
  constructor() {}

  ngOnInit() {}
}
