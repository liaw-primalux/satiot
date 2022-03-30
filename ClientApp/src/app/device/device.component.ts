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
  componentList: AppObject[];
  threatList: AppObject[];

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
    this.getComponentsByDevice();
  }

  getDeviceById() {
    this.sharedService.getDeviceById(this.device.id)
      .subscribe(
        (response: AppObject) => {
          this.device = response;
        }
      );
  }

  getComponentsByDevice() {
    this.sharedService.getChildrenByParentId(this.device.id)
      .subscribe(
        (response: AppObject[]) => {
          this.componentList = response;
        }
      );
  }

  getThreatsByComponents() {
    let parentIds = [];
    this.componentList.forEach(element => {
      parentIds.push(element.id);
    });

    this.sharedService.getChildrenByParentList(parentIds)
      .subscribe(
        (response: AppObject[]) => {
          this.threatList = response;
        }
      );
  }

}
