import { Component, OnInit, input } from '@angular/core';

@Component({
  selector: 'app-worker-card',
  imports: [],
  templateUrl: './worker-card.html',
  styleUrl: './worker-card.css',
})
export class WorkerCard implements OnInit {
  readonly worker = input<any>();
  readonly orgs = input<any[]>([]);
  public organizationName: string = 'Organization';
  public organizationLogo: string = 'Organization';

  ngOnInit(): void {
    this.organizationName = this.getOrganizationName(this.worker().org_id);
    this.organizationLogo = this.getOrganizationLogo(this.worker().org_id);
  }

  getOrganizationName(workerId: number | string): string {
    const organization = this.orgs().find((org) => org.id == workerId);
    return organization ? organization.name : 'Unknown Organization';
  }
  
  getOrganizationLogo(workerId: number | string): string {
    const organization = this.orgs().find((org) => org.id == workerId);
    return organization ? organization.logo : 'Unknown Organization';
  }

  onImgError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'assets/default.png';
  }
}
