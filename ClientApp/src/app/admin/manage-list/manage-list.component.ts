import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppObject } from 'src/app/models/appObject';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-manage-list',
  templateUrl: './manage-list.component.html',
  styleUrls: ['./manage-list.component.css']
})
export class ManageListComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  httpLoading = false;
  objType: string;
  objectList: AppObject[];

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.objType = params.get('objType');
    });

    this.getObjectsByType();
  }

  getObjectsByType() {
    this.httpLoading = true;
    this.adminService.getObjectsByType(this.objType.toUpperCase())
      .subscribe(
        (response: AppObject[]) => {
          this.objectList = response;
        },
        (error) => {
          this.toastr.error("Unable to retrieve " + this.objType + ". Please contact system administrator.", "System error..", {
            closeButton: true,
            progressBar: true,
            timeOut: 0,
            extendedTimeOut: 1500
          });
        }
      ).add(() => {
        this.httpLoading = false;
      });
  }

  onInitNewRow(e: AppObject) {
    e.objType = this.objType.toUpperCase();
    e.active = true;
  }

  insertObject(appObject: AppObject) {
    appObject.updatedBy = this.user.username;
    this.httpLoading = true;
    this.adminService.insertObject(appObject)
      .subscribe(
        (response: AppObject) => {
          let index = this.objectList.findIndex(x => x.id == null);
          this.objectList[index] = response;
          this.toastr.success("Saved.");
        },
        (error) => {
          this.toastr.error("Failed to save. Please contact system administrator.", "System error..", {
            closeButton: true,
            progressBar: true,
            timeOut: 0,
            extendedTimeOut: 1500
          });
        }
      ).add(() => {
        this.httpLoading = false;
      });
  }

  updateObject(appObject: AppObject) {
    appObject.updatedBy = this.user.username;
    this.httpLoading = true;
    this.adminService.updateObject(appObject)
      .subscribe(
        (response: AppObject) => {
          let index = this.objectList.findIndex(x => x.id == response.id);
          this.objectList[index] = response;
          this.toastr.success("Saved.");
        },
        (error) => {
          this.toastr.error("Failed to save. Please contact system administrator.", "System error..", {
            closeButton: true,
            progressBar: true,
            timeOut: 0,
            extendedTimeOut: 1500
          });
        }
      ).add(() => {
        this.httpLoading = false;
      });
  }

  deleteObject(appObject: AppObject) {
    this.httpLoading = true;
    this.adminService.deleteObject(appObject)
      .subscribe(
        (response: AppObject) => {
          this.toastr.success("Deleted.");
        },
        (error) => {
          this.toastr.error("Failed to delete. Please contact system administrator.", "System error..", {
            closeButton: true,
            progressBar: true,
            timeOut: 0,
            extendedTimeOut: 1500
          });
        }
      ).add(() => {
        this.httpLoading = false;
      });
  }
}
