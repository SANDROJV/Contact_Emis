import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = 'http://localhost/contact_emis/contact_emis_backend';

  constructor(private http: HttpClient) {}

  getOrganizations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_organizations.php`);
  }

  getWorkers(orgId?: number): Observable<any> {
    if (orgId) {
      return this.http.get(`${this.baseUrl}/get_workers.php?org_id=${orgId}`);
    } else {
      return this.http.get(`${this.baseUrl}/get_workers.php`);
    }
  }
}
