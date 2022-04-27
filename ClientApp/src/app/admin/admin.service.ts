import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AppObject } from '../models/appObject';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.apiUrl + 'api/Admin';

  constructor(private HttpClient: HttpClient) { }

  getObjectsByType(objType: string) {
    return this.HttpClient.get(this.apiUrl + '/GetObjectsByType?objType=' + objType);
  }

  insertObject(appObject: AppObject) {
    return this.HttpClient.post(this.apiUrl + '/InsertObj', appObject);
  }

  updateObject(appObject: AppObject) {
    return this.HttpClient.post(this.apiUrl + '/UpdateObj', appObject);
  }

  deleteObject(appObject: AppObject) {
    return this.HttpClient.post(this.apiUrl + '/DeleteObj', appObject);
  }

  getDeviceById(id: number) {
    return this.HttpClient.get(this.apiUrl + '/GetDeviceById?id=' + id);
  }

}
