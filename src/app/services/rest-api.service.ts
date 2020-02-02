import { Injectable } from '@angular/core';
import { SprintModel } from '../model/SprintModel';
import { localhostApiUrl } from '../model/UtilConstants-template';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  localhostURL = localhostApiUrl;

  constructor(private http: HttpClient) { }

  getLocalhostApiData(): Observable<HttpResponse<SprintModel[]>> {
    return this.http.get<SprintModel[]>(
      this.localhostURL + "/sprints", { observe: 'response'}
    );
  }


}
