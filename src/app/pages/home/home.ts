import { Component, OnInit } from '@angular/core';
import { WorkerCard } from '../../components/worker-card/worker-card';
import { CommonModule } from '@angular/common';
import { Api } from '../../services/api';

@Component({
  selector: 'app-home',
  imports: [WorkerCard, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  workers: any[] = [];
  orgs: any[] = [];
  public organizationLogo: string = 'Organization';


  constructor(private api: Api) {}

  ngOnInit(): void {
    this.api.getWorkers().subscribe({
      next: (data) => {
        console.log('Workers from database', data);
        this.workers = data;
      },
      error: (err) => console.error('Error fetching workers:', err),
    });
    this.api.getOrganizations().subscribe({
      next: (data) => {
        console.log('Organizations from database', data);
        this.orgs = data;
      },
      error: (err) => console.error('Error fetching organizations:', err),
    });
    
  }
}
