import { Component, OnInit } from '@angular/core';
import { WorkerCard } from '../../components/worker-card/worker-card';
import { CommonModule } from '@angular/common';
import { Api } from '../../services/api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [WorkerCard, CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  public workers: any[] = [];
  public filteredWorkers: any[] = [];
  public orgs: any[] = [];
  public organizationLogo: string = 'Organization';
  public activeOrgId: number | null = null;
  public searchKeyword: string = '';

  constructor(private api: Api) {}

  ngOnInit(): void {
    this.api.getWorkers().subscribe({
      next: (data) => {
        this.workers = data;
        this.applyFilters();
      },
      error: (err) => console.error('Error fetching workers:', err),
    });
    this.api.getOrganizations().subscribe({
      next: (data) => {
        this.orgs = data;
      },
      error: (err) => console.error('Error fetching organizations:', err),
    });
  }

  applyFilters(): void {
    let workers = this.workers;
    const keyword = this.searchKeyword.toLowerCase().trim();

    if (this.activeOrgId !== null) {
      workers = workers.filter(
        (worker) =>
          worker &&
          worker.org_id &&
          Number(worker.org_id) === Number(this.activeOrgId)
      );
    }

    if (keyword) {
      this.filteredWorkers = workers.filter((worker) => {
        if (!worker) return false;
        const data = [
          worker.full_name,
          worker.department,
          worker.position,
          worker.email,
          worker.phone,
          worker.employment_year,
        ]
          .map((x) => (x ? x.toLowerCase() : ''))
          .join(' ');
        return data.includes(keyword);
      });
    } else {
      this.filteredWorkers = workers;
    }
  }

  filterWorkersByOrg(orgId: number): void {
    this.activeOrgId = this.activeOrgId === orgId ? null : orgId;
    this.applyFilters();
  }
  resetFilter(): void {
    this.activeOrgId = null;
    this.searchKeyword = '';
    this.applyFilters();
  }
}
