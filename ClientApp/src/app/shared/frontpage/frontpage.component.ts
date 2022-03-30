import { Component, OnInit } from '@angular/core';
import { AppObject } from 'src/app/models/appObject';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {
  httpLoading = false;
  categoryList: AppObject[];
  selectedCategory: AppObject;
  deviceList: AppObject[];

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.getObjectsByType('CATEGORY');
  }

  getObjectsByType(objType: string) {
    this.sharedService.getObjectsByType(objType)
      .subscribe(
        (response: AppObject[]) => {
          this[objType.toLowerCase() + 'List'] = response;
        }
      );
  }

  getDevicesByCat(parentId: number) {
    this.sharedService.getChildrenByParentId(parentId)
      .subscribe(
        (response: AppObject[]) => {
          this.deviceList = response;
        }
      );
  }

}
