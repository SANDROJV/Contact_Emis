import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiBaseUrl } from '../../environment/environment';
import { Organization } from '../../models/org.model';
import { Worker } from '../../models/worker.model';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = apiBaseUrl;

  constructor(private http: HttpClient) {}

  getOrganizations(){
    return this.http.get<Organization[]>(`${this.baseUrl}/get_organizations.php`);
  }

  getWorkers(orgId?: number) {
    return this.http.get<Worker[]>(`${this.baseUrl}/get_workers.php`, {
      params: {
        org_Id: orgId ?? ''
      }
    });
  }
}
