import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { ToastrService } from 'ngx-toastr';
import { AppObject } from '../models/appObject';
import { DtoObject } from '../models/dto/dtoObject';
import { DtoObjectAssoc } from '../models/dto/dtoObjectAssoc';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  completionMsgs: DtoObjectAssoc[];
  getdeviceLoading = false;
  device: DtoObject;
  getcomponentListLoading = false;
  componentList: AppObject[];
  getthreatListLoading = false;
  threatList: DtoObject[];
  getmitigationListLoading = false;
  mitigationList: DtoObject[];
  countMitigated = 0;
  percentageComplete = 0;
  mcompleteStage = "";
  mcompleteMsg = "";

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
    this.getCompletionMsgs();
    this.getComponentsByDevice();
  }

  getCompletionMsgs() {
    this.sharedService.getParentAndChildByParentType("MCOMPLETESTAGE")
      .subscribe(
        (response: any) => {
          this.completionMsgs = response;
        }
      );
  }

  getDeviceById() {
    this.getdeviceLoading = true;
    this.sharedService.getDeviceById(this.device.id)
      .subscribe(
        (response: DtoObject) => {
          this.device = response;
        },
        (error) => {
          this.toastr.error("Failed to retrieve device details. Please contact system administrator.", "System error..",
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
          this.toastr.error("Failed to retrieve components. Please contact system administrator.", "System error..",
            { closeButton: true, progressBar: true, timeOut: 0, extendedTimeOut: 1500 });
        }
      ).add(() => {
        this.getcomponentListLoading = false;
      });
  }

  getThreatsByComponents() {
    this.gridComponents.instance.saveEditData();

    this.mitigationList = null;
    let components = [];
    this.getthreatListLoading = true;
    this.componentList.forEach(element => {
      if (element.active)
        components.push(element.id);
    });

    this.sharedService.getChildAssocByParentIds(components)
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

  getMitigationByThreats() {
    let threats = [];
    this.getmitigationListLoading = true;
    this.threatList.forEach(element => {
      threats.push(element.id);
    });

    this.sharedService.getChildAssocByParentIds(threats)
      .subscribe(
        (response: DtoObject[]) => {
          response.forEach(element => {
            element.active = false;
          });
          this.mitigationList = response;
        },
        (error) => {
          this.toastr.error("Failed to retrieve mitigations. Please contact system administrator.", "System error..",
            { closeButton: true, progressBar: true, timeOut: 0, extendedTimeOut: 1500 });
        }
      ).add(() => {
        this.getmitigationListLoading = false;
      });
  }

  evaluateRisk(flag: boolean) {
    if (flag)
      this.countMitigated++;
    else
      this.countMitigated--;

    this.percentageComplete = this.countMitigated / this.mitigationList.length * 100;

    if (this.percentageComplete < 25)
      this.mcompleteStage = "STAGE1";
    else if (this.percentageComplete >= 25 && this.percentageComplete < 50)
      this.mcompleteStage = "STAGE2";
    else if (this.percentageComplete >= 50 && this.percentageComplete < 75)
      this.mcompleteStage = "STAGE3";
    else if (this.percentageComplete >= 75 && this.percentageComplete < 100)
      this.mcompleteStage = "STAGE4";
    else if (this.percentageComplete == 100)
      this.mcompleteStage = "STAGE5";

    let index = this.completionMsgs.findIndex(x => x.objName == this.mcompleteStage);
    let noOfMsgs = this.completionMsgs[index].child.length;
    let randomIndex = Math.floor(Math.random() * (noOfMsgs));
    this.mcompleteMsg = this.completionMsgs[index].child[randomIndex].objDesc;
  }
}
