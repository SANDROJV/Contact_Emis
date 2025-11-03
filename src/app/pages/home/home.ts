import {
  Component,
  HostListener,
  ElementRef,
  ChangeDetectionStrategy,
  viewChild,
  viewChildren,
  computed,
  signal,
  inject,
} from '@angular/core';
import { WorkerCard } from '../../components/worker-card/worker-card';
import { Api } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  imports: [WorkerCard, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly workers = rxResource({
    stream: () => this.api.getWorkers(),
  });
  protected readonly orgs = rxResource({
    stream: () => this.api.getOrganizations(),
  });
  protected readonly filteredWorkers = computed(() => {
    const workers = this.workers.value() ?? [];
    const keyword = this.searchKeyword().toLowerCase().trim();
    const activeOrgId = this.activeOrgId();
    const activeOrgDep = this.activeOrgDep();

    return workers.filter((worker) => {
      if (!worker) return false;

      let matches = true;

      if (activeOrgId !== null) {
        matches = matches && Number(worker.org_id) === Number(activeOrgId);
      }

      if (activeOrgDep !== null) {
        matches = matches && worker.department === activeOrgDep;
      }

      if (keyword) {
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

        matches = matches && data.includes(keyword);
      }

      return matches;
    });
  });

  protected readonly activeOrgId = signal<number | null>(null);
  protected readonly activeOrgDep = signal<string | null>(null);

  protected readonly searchKeyword = signal('');

  protected readonly showAll = signal(false);
  protected workersPerRow: number = 0;
  protected maxVisible: number = 0;

  protected readonly workerContainer = viewChild.required('workerContainer', { read: ElementRef });
  protected readonly workerCards = viewChildren('workerCard', { read: ElementRef });

  protected isOrgOpen = false;

  private api = inject(Api);

  @HostListener('window:resize')
  protected onResize() {
    this.calculateVisibleWorkers();
  }

  protected calculateVisibleWorkers(): void {
    const workerCards = this.workerCards();
    const container = this.workerContainer().nativeElement;
    const firstCardRef = workerCards && workerCards[0];
    const card = firstCardRef?.nativeElement;

    if (!container || !card) return;
    const containerWidth = container.offsetWidth;
    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;

    if (!containerWidth || !cardWidth || !cardHeight) return;

    this.workersPerRow = Math.max(1, Math.floor(containerWidth / cardWidth));

    const totalRowsNeeded = Math.ceil(this.filteredWorkers().length / this.workersPerRow);
    const visibleRows = Math.min(totalRowsNeeded, 2);

    this.maxVisible = this.workersPerRow * visibleRows;
  }

  protected readonly activeOrgDepartments = computed(() => {
  const orgId = this.activeOrgId();
  const allWorkers = this.workers.value() ?? [];

  if (!orgId) return [];

  const departments = allWorkers
    .filter((w) => Number(w.org_id) === Number(orgId))
    .map((w) => w.department)
    .filter((dep): dep is string => !!dep);

  return Array.from(new Set(departments));
});

  protected readonly showFade = computed(
    () => !this.showAll() && this.filteredWorkers().length > this.maxVisible
  );

  protected toggleShowAll(): void {
    this.showAll.update((v) => !v);
  }

  protected filterWorkersByOrg(orgId: number): void {
    this.activeOrgDep.set(null)
    this.activeOrgId.update((current) => (current === orgId ? null : orgId));
  }

  protected filterWorkersByDep(workerDep: string): void {
    this.activeOrgDep.update((current) => (current === workerDep ? null : workerDep));
  }

  protected filterWorkersByBigOrg(orgId: number): void {
    this.isOrgOpen = this.isOrgOpen === false ? true : false;
    this.filterWorkersByOrg(orgId);
  }

  protected resetFilter(): void {
    this.activeOrgId.set(null);
    this.activeOrgDep.set(null);
    this.searchKeyword.set('');
  }
}
