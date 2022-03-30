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

  getDevicesByCat(parentId: number) {
    return this.HttpClient.get(this.apiUrl + '/GetDevicesByCat?parentId=' + parentId);
  }
}
