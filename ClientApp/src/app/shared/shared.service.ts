import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private apiUrl = environment.apiUrl + 'api/Common';

  constructor(private HttpClient: HttpClient) { }

  getObjectsByType(objType: string) {
    return this.HttpClient.get(this.apiUrl + '/GetObjectsByType?objType=' + objType);
  }

  getChildrenByParentId(parentId: number) {
    return this.HttpClient.get(this.apiUrl + '/GetChildrenByParentId?parentId=' + parentId);
  }

  getChildrenByParentList(parentIds: number[]) {
    return this.HttpClient.post(this.apiUrl + '/GetChildrenByParentList', parentIds);
  }

  getDeviceById(id: number) {
    return this.HttpClient.get(this.apiUrl + '/GetDeviceById?id=' + id);
  }

}
