import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
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

  public showAll: boolean = false;
  public workersPerRow: number = 0;
  public maxVisible: number = 0;

  @ViewChild('workerContainer') workerContainer!: ElementRef;
  @ViewChildren('workerCard', { read: ElementRef }) workerCards!: QueryList<ElementRef>;
  @ViewChild('workers') workersSection!: ElementRef;

  isOrgOpen = false;

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

  @HostListener('window:resize')
  onResize() {
    this.calculateVisibleWorkers();
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
  }

  calculateVisibleWorkers(): void {
    setTimeout(() => {
      const container = this.workerContainer?.nativeElement;
      const firstCardRef = this.workerCards && this.workerCards.first;
      const card = firstCardRef?.nativeElement;

      if (!container || !card) return;
      const containerWidth = container.offsetWidth;
      const cardWidth = card.offsetWidth;
      const cardHeight = card.offsetHeight;

      if (!containerWidth || !cardWidth || !cardHeight) return;

      this.workersPerRow = Math.max(1, Math.floor(containerWidth / cardWidth));

      const totalRowsNeeded = Math.ceil(this.filteredWorkers.length / this.workersPerRow);
      const visibleRows = Math.min(totalRowsNeeded, 2);

      this.maxVisible = this.workersPerRow * visibleRows;
    }, 10);
  }

  get visibleWorkers(): any[] {
    return this.showAll || this.filteredWorkers.length <= this.maxVisible
      ? this.filteredWorkers
      : this.filteredWorkers.slice(0, this.maxVisible);
  }

  get showFade(): boolean {
    return !this.showAll && this.filteredWorkers.length > this.maxVisible;
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
  }

  filterWorkersByOrg(orgId: number): void {
    this.activeOrgId = this.activeOrgId === orgId ? null : orgId;
    this.applyFilters();
  }

  filterWorkersByBigOrg(orgId: number): void {
    this.isOrgOpen = this.isOrgOpen === false ? true : false;
    this.filterWorkersByOrg(orgId);
  }

  resetFilter(): void {
    this.activeOrgId = null;
    this.searchKeyword = '';
    this.applyFilters();
  }
}
