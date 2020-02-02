import { Injectable } from '@angular/core';
import { SprintModel } from '../model/SprintModel';
import { localhostApiUrl, remoteEndpointApiUrl } from '../model/UtilConstants';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  localhostURL = localhostApiUrl;
  remoteURL = remoteEndpointApiUrl;

  constructor(private http: HttpClient) { }

  getLocalhostApiData(): Observable<HttpResponse<SprintModel[]>> {
    return this.http.get<SprintModel[]>(
      this.localhostURL, { observe: 'response'}
    );
  }

  getRemoteEndpointApiData(): Observable<HttpResponse<SprintModel[]>> {
    return this.http.get<SprintModel[]>(
      this.remoteURL, { observe: 'response'}
    );
  }


}
