import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reciever-info',
  templateUrl: './reciever-info.component.html',
  styleUrls: ['./reciever-info.component.css'],
})
export class RecieverInfoComponent implements OnInit {
  @Input() recieverInfo;
  constructor() {}

  ngOnInit() {}
}
