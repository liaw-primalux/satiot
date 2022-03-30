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
    this.httpLoading = true;
    this.sharedService.getObjectsByType(objType)
      .subscribe(
        (response: AppObject[]) => {
          this.httpLoading = false;
          this[objType.toLowerCase() + 'List'] = response;
        }
      );
  }

  getDevicesByCat(parentId: number) {
    console.log(parentId)
    this.sharedService.getDevicesByCat(parentId)
      .subscribe(
        (response: AppObject[]) => {
          this.httpLoading = false;
          this.deviceList = response;
        }
      );
  }

}
