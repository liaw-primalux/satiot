import { Component, OnInit } from '@angular/core';
import { AppObject } from 'src/app/models/appObject';
import { SharedService } from '../shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {
  httpLoading = false;
  started = false;
  categoryList: AppObject[];
  getcategoryListLoading = false;
  selectedCategory: AppObject;
  deviceList: AppObject[];
  getdeviceListLoading = false;

  constructor(
    private sharedService: SharedService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getObjectsByType('CATEGORY');
  }

  getObjectsByType(objType: string) {
    this['get' + objType.toLowerCase() + 'ListLoading'] = true;
    this.sharedService.getObjectsByType(objType)
      .subscribe(
        (response: AppObject[]) => {
          this[objType.toLowerCase() + 'List'] = response;
        },
        (error) => {
          this.toastr.error("Failed to retrieve " + objType.toLocaleLowerCase() + " list. Please contact system administrator.", "System error..",
            { closeButton: true, progressBar: true, timeOut: 0, extendedTimeOut: 1500 });
        }
      ).add(() => {
        this['get' + objType.toLowerCase() + 'ListLoading'] = false;
      });
  }

  getDevicesByCat(parentId: number) {
    this.getdeviceListLoading = true;
    this.sharedService.getChildrenByParentId(parentId)
      .subscribe(
        (response: AppObject[]) => {
          this.deviceList = response;
        },
        (error) => {
          this.toastr.error("Failed to retrieve devices. Please contact system administrator.", "System error..",
            { closeButton: true, progressBar: true, timeOut: 0, extendedTimeOut: 1500 });
        }
      ).add(() => {
        this.getdeviceListLoading = false;
      });
  }

}
