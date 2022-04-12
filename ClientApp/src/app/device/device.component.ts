import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { ToastrService } from 'ngx-toastr';
import { AppObject } from '../models/appObject';
import { DtoObject } from '../models/dto/dtoObject';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  getdeviceLoading = false;
  device: DtoObject;
  getcomponentListLoading = false;
  componentList: AppObject[];
  getthreatListLoading = false;
  threatList: DtoObject[];
  countermList: AppObject[];

  @ViewChild("gridComponents", { static: false }) gridComponents: DxDataGridComponent;

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.device = new DtoObject();
    this.route.paramMap.subscribe(params => {
      this.device.id = +params.get('id');
    });

    this.getDeviceById();
    this.getComponentsByDevice();
  }

  getDeviceById() {
    this.getdeviceLoading = true;
    this.sharedService.getDeviceById(this.device.id)
      .subscribe(
        (response: DtoObject) => {
          this.device = response;
        },
        (error) => {
          this.toastr.error("Failed to device details. Please contact system administrator.", "System error..",
            { closeButton: true, progressBar: true, timeOut: 0, extendedTimeOut: 1500 });
        }
      ).add(() => {
        this.getdeviceLoading = false;
      });
  }

  getComponentsByDevice() {
    this.getcomponentListLoading = true;
    this.sharedService.getChildrenByParentId(this.device.id)
      .subscribe(
        (response: AppObject[]) => {
          this.componentList = response;
        },
        (error) => {
          this.toastr.error("Failed to components. Please contact system administrator.", "System error..",
            { closeButton: true, progressBar: true, timeOut: 0, extendedTimeOut: 1500 });
        }
      ).add(() => {
        this.getcomponentListLoading = false;
      });
  }

  getThreatsByComponents() {
    this.gridComponents.instance.saveEditData();

    let components = [];
    this.getthreatListLoading = true;
    this.componentList.forEach(element => {
      if (element.active)
        components.push(element.id);
    });

    this.sharedService.getThreatsByComponents(components)
      .subscribe(
        (response: DtoObject[]) => {
          this.threatList = response;
        },
        (error) => {
          this.toastr.error("Failed to retrieve threats. Please contact system administrator.", "System error..",
            { closeButton: true, progressBar: true, timeOut: 0, extendedTimeOut: 1500 });
        }
      ).add(() => {
        this.getthreatListLoading = false;
      });
  }

  getCountermByThreats() {
    this.countermList = [];
  }

}
