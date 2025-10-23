import { Component, OnInit } from '@angular/core';
import { WorkerCard } from '../../components/worker-card/worker-card';
import { CommonModule } from '@angular/common';
import { Api } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

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
  public loading: boolean = true;

  public visibleCount: number = 10;
  public visibleWorkers: any[] = [];

  constructor(private api: Api) {}

  async ngOnInit(): Promise<void> {
    try {
      const [workers, orgs] = await Promise.all([
        firstValueFrom(this.api.getWorkers()),
        firstValueFrom(this.api.getOrganizations()),
      ]);
      this.workers = workers ?? [];
      this.orgs = orgs ?? [];
      this.applyFilters();
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      this.loading = false;
    }
  }

  applyFilters(): void {
    let workers = this.workers;
    const keyword = this.searchKeyword.toLowerCase().trim();

    if (this.activeOrgId !== null) {
      workers = workers.filter(
        (worker) => worker && worker.org_id && Number(worker.org_id) === Number(this.activeOrgId)
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
    this.updateVisibleWorkers();
  }

  updateVisibleWorkers(): void {
    if (this.visibleCount > this.filteredWorkers.length) {
      this.visibleCount = this.filteredWorkers.length;
    }
    this.visibleWorkers = this.filteredWorkers.slice(0, this.visibleCount);
  }

  showMore(): void {
    this.visibleCount = Math.min(this.visibleCount + 12, this.filteredWorkers.length);
    this.updateVisibleWorkers();
  }

  canShowMore(): boolean {
    return this.filteredWorkers.length > this.visibleCount;
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
