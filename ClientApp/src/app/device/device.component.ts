import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppObject } from '../models/appObject';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  device: AppObject;

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) { }
  ngOnInit() {
    this.device = new AppObject();
    this.route.paramMap.subscribe(params => {
      this.device.id = +params.get('id');
    });

    this.getDeviceById();
  }

  getDeviceById() {
    this.sharedService.getDeviceById(this.device.id)
      .subscribe(
        (response: AppObject) => {
          this.device = response;
        }
      );
  }

}
